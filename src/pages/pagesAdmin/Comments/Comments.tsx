// src/components/admin/CommentsAdmin.tsx
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { supabase } from "@/lib/supabaseClient";

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  product_id: number;
  isActive: boolean;
  producto: {
    id: number;
    name: string;
  } | null;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  } | null;
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

  // 🔹 Cargar blogs y productos al montar
  useEffect(() => {
    fetchBlogs();
    fetchProducts();
  }, []);

  // 🔹 Obtener blogs con relación a producto y perfil
  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select(`
        id,
        titulo,
        descripcion,
        isActive,
        product_id,
        user_id,
        producto:product_id(id,name),
        profile:user_id(id,first_name,last_name,avatar_url)
      `)
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Error al cargar los blogs");
    } else {
      setBlogs(data || []);
    }
  };

  // 🔹 Obtener todos los productos
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("productos").select("id,name");
    if (error) {
      console.error(error);
      toast.error("Error al cargar productos");
    } else {
      setProducts(data || []);
    }
  };

  // 🔹 Crear o actualizar blog
  const handleSubmit = async () => {
    if (!form.titulo || !form.descripcion || !form.product_id) {
      return toast.error("Completa todos los campos");
    }

    const payload = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      product_id: form.product_id,
      isActive: form.isActive,
      user_id: supabase.auth.user()?.id, // usuario actual
    };

    if (editMode) {
      const { error } = await supabase.from("blogs").update(payload).eq("id", form.id);
      if (error) {
        console.error(error);
        toast.error("Error al actualizar el blog");
        return;
      }
      toast.success("Blog actualizado ✅");
    } else {
      const { error } = await supabase.from("blogs").insert(payload);
      if (error) {
        console.error(error);
        toast.error("Error al crear el blog");
        return;
      }
      toast.success("Blog enviado para revisión ✅");
    }

    setForm({ id: 0, titulo: "", descripcion: "", product_id: 0, isActive: false });
    setEditMode(false);
    setOpen(false);
    fetchBlogs();
  };

  // 🔹 Editar blog
  const handleEdit = (blog: Blog) => {
    setForm({
      id: blog.id,
      titulo: blog.titulo,
      descripcion: blog.descripcion,
      product_id: blog.product_id,
      isActive: blog.isActive,
    });
    setEditMode(true);
    setOpen(true);
  };

  // 🔹 Eliminar blog
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      console.error(error);
      toast.error("Error al eliminar el blog");
      return;
    }
    toast.success("Blog eliminado 🗑️");
    fetchBlogs();
  };

  // 🔹 Activar/desactivar blog
  const toggleActive = async (id: number, current: boolean) => {
    const { error } = await supabase.from("blogs").update({ isActive: !current }).eq("id", id);
    if (error) {
      console.error(error);
      toast.error("Error al actualizar estado");
      return;
    }
    fetchBlogs();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-sky-800">Gestión de Blogs</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditMode(false);
                setForm({ id: 0, titulo: "", descripcion: "", product_id: 0, isActive: false });
              }}
            >
              Nuevo Blog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? "Editar Blog" : "Nuevo Blog"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Título"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
              <Input
                placeholder="Descripción"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              />
              <Select
                value={form.product_id.toString()}
                onValueChange={(val) => setForm({ ...form, product_id: parseInt(val) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((prod) => (
                    <SelectItem key={prod.id} value={prod.id.toString()}>
                      {prod.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="flex gap-2 items-center text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Activo
              </label>
              <Button onClick={handleSubmit}>{editMode ? "Actualizar" : "Agregar"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{blog.titulo}</h2>
              <p className="text-sm text-gray-600">{blog.descripcion}</p>
              <p className="text-xs text-gray-500">
                Producto: {blog.producto?.name || "N/A"} | Autor: {blog.profile?.first_name || "Desconocido"}
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleEdit(blog)}>
                Editar
              </Button>
              <Button variant="outline" onClick={() => toggleActive(blog.id, blog.isActive)}>
                {blog.isActive ? "Desactivar" : "Activar"}
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(blog.id)}>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}