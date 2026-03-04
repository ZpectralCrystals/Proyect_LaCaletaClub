import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  // agrega los campos que necesites
}

export interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  isActive: boolean;
  created_at: string;
  producto: Producto | null;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tituloBlog, setTituloBlog] = useState("");
  const [descripcionBlog, setDescripcionBlog] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener todos los blogs activos y sus productos
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          id,
          titulo,
          descripcion,
          "isActive",
          created_at,
          producto:product_id(*)  -- join correcto con FK product_id
        `)
        .eq("isActive", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data as Blog[]);
    } catch (err: any) {
      toast.error("Error al cargar blogs");
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Crear un nuevo blog (inactivo por defecto)
  const enviarBlog = async (productoId: number, userId: string) => {
    if (!tituloBlog.trim() || !descripcionBlog.trim()) return;

    try {
      const { error } = await supabase.from("blogs").insert([
        {
          titulo: tituloBlog,
          descripcion: descripcionBlog,
          "isActive": false,
          product_id: productoId,
          user_id: userId,
        },
      ]);

      if (error) throw error;

      toast.success("✅ Enviado para revisión.");
      setTituloBlog("");
      setDescripcionBlog("");
      fetchBlogs();
    } catch (err: any) {
      toast.error("❌ No se pudo enviar el blog.");
      console.error(err);
    }
  };

  // 🔹 Eliminar blog
  const eliminarBlog = async (id: number) => {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      toast.success("🗑️ Eliminado correctamente.");
      fetchBlogs();
    } catch (err: any) {
      toast.error("❌ No se pudo eliminar.");
      console.error(err);
    }
  };

  // 🔹 Aprobar blog (solo admins)
  const aprobarBlog = async (id: number) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ "isActive": true })
        .eq("id", id);

      if (error) throw error;

      toast.success("✅ Blog aprobado.");
      fetchBlogs();
    } catch (err: any) {
      toast.error("❌ No se pudo aprobar.");
      console.error(err);
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