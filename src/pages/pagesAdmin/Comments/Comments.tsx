import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  product_id: number;
  isActive: boolean;
}

interface Product {
  id: number;
  name: string;
}

export default function CommentsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    titulo: "",
    descripcion: "",
    product_id: 0,
    isActive: false,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchBlogs();
    fetchProducts();
  }, []);

  const fetchBlogs = async () => {
    const { data } = await supabase.from("blogtab").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("productostab").select("id, name");
    if (data) setProducts(data);
  };

  const handleSubmit = async () => {
    if (!form.titulo || !form.descripcion || !form.product_id) return alert("Completa todos los campos");

    const payload = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      product_id: Number(form.product_id),
      isActive: form.isActive,
    };

    if (editMode) {
      await supabase.from("blogtab").update(payload).eq("id", form.id);
    } else {
      await supabase.from("blogtab").insert([{ ...payload, searchTree: Date.now() }]);
    }

    fetchBlogs();
    setForm({ id: 0, titulo: "", descripcion: "", product_id: 0, isActive: false });
    setEditMode(false);
    setOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setForm(blog);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("blogtab").delete().eq("id", id);
    fetchBlogs();
  };

  const toggleActive = async (id: number, current: boolean) => {
    await supabase.from("blogtab").update({ isActive: !current }).eq("id", id);
    fetchBlogs();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-sky-800">Gestión de Blogs</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditMode(false);
              setForm({ id: 0, titulo: "", descripcion: "", product_id: 0, isActive: false });
            }}>
              Nuevo Blog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? "Editar Blog" : "Nuevo Blog"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
              <Input placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
              <Select value={form.product_id.toString()} onValueChange={(val) => setForm({ ...form, product_id: parseInt(val) })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((prod) => (
                    <SelectItem key={prod.id} value={prod.id.toString()}>{prod.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="flex gap-2 items-center text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Activo
              </label>
              <Button onClick={handleSubmit}>{editMode ? "Actualizar" : "Agregar"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{blog.titulo}</h2>
              <p className="text-sm text-gray-600">{blog.descripcion}</p>
              <p className="text-xs text-gray-500">Producto ID: {blog.product_id}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleEdit(blog)}>Editar</Button>
              <Button variant="outline" onClick={() => toggleActive(blog.id, blog.isActive)}>
                {blog.isActive ? "Desactivar" : "Activar"}
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(blog.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
