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
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/blogs/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error("Error al cargar los blogs");
    }
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/productos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const handleSubmit = async () => {
  // Validar que todos los campos requeridos estén presentes
  if (!form.titulo || !form.descripcion || !form.product_id) {
    return alert("Completa todos los campos");
  }

  const payload = {
    titulo: form.titulo,
    descripcion: form.descripcion,
    product_id: Number(form.product_id), // Asegúrate de que product_id sea un número
    isActive: form.isActive, // El estado de activación (por defecto será falso)
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/api/blogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`, // Token JWT para autenticación
      },
      body: JSON.stringify(payload), // Solo los campos necesarios
    });

    if (!res.ok) {
      const errorData = await res.json(); // Obtener los detalles del error
      console.error(errorData); // Imprimir el error para más detalles
      throw new Error(errorData.detail || "Error desconocido");
    }

    toast.success("✅ Enviada para revisión.");
    setForm({ id: 0, titulo: "", descripcion: "", product_id: 0, isActive: false });
    fetchBlogs();
    setOpen(false); // Cerrar el modal de creación
  } catch (error) {
    toast.error(`❌ ${error.message || "No se pudo enviar el blog."}`);
  }
};




  const handleEdit = (blog: Blog) => {
    setForm(blog);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (error) {
      toast.error("Error al eliminar el blog");
    }
  };

  const toggleActive = async (id: number, current: boolean) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !current }),
      });
      fetchBlogs();
    } catch (error) {
      toast.error("Error al actualizar estado");
    }
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
