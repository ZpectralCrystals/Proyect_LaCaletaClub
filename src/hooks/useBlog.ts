import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Producto } from "./useProductos";

export interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  isActive: boolean;
  created_at: string;
  producto: Producto;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tituloBlog, setTituloBlog] = useState("");
  const [descripcionBlog, setDescripcionBlog] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/blogs/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  // 🔹 Obtener todos los blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers });
      const body = await res.text();

      if (!res.ok) throw new Error("Error al obtener blogs");
      const data = JSON.parse(body);
      const dataArray = Array.isArray(data) ? data : [];

      const formateadas: Blog[] = dataArray.map((item: any) => ({
        id: item.id,
        titulo: item.titulo,
        descripcion: item.descripcion,
        isActive: item.isActive,
        created_at: item.created_at,
        producto: item.producto,
      }));

      setBlogs(formateadas);
    } catch {
      toast.error("Error al cargar blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Crear blog (sin pedir profile)
  const enviarBlog = async (productoId: number) => {
    if (!tituloBlog.trim() || !descripcionBlog.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          titulo: tituloBlog,
          descripcion: descripcionBlog,
          producto: productoId,
          isActive: false,
        }),
      });

      if (!res.ok) throw new Error("Error creando blog");
      toast.success("✅ Enviada para revisión.");

      setTituloBlog("");
      setDescripcionBlog("");
      fetchBlogs();
    } catch {
      toast.error("❌ No se pudo enviar el blog.");
    }
  };

  // 🔹 Eliminar blog
  const eliminarBlog = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error();
      toast.success("🗑️ Eliminado correctamente.");
      fetchBlogs();
    } catch {
      toast.error("❌ No se pudo eliminar.");
    }
  };

  // 🔹 Aprobar blog
  const aprobarBlog = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ isActive: true }),
      });
      if (!res.ok) throw new Error();
      toast.success("✅ Blog aprobado.");
      fetchBlogs();
    } catch {
      toast.error("❌ No se pudo aprobar.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    tituloBlog,
    setTituloBlog,
    descripcionBlog,
    setDescripcionBlog,
    enviarBlog,
    eliminarBlog,
    aprobarBlog,
    loading,
    fetchBlogs,
  };
}
