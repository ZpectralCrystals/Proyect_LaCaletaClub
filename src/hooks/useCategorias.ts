import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export interface Categoria {
  id: number;
  descripcion: string;
  isActive: boolean;
  icon: string;
}

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener todas las categorías
  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      setCategorias(data as Categoria[]);
    } catch (err: any) {
      toast.error("Error cargando categorías");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Crear o actualizar categoría
  const addOrUpdateCategoria = async (
    categoria: Omit<Categoria, "id" | "isActive">,
    editing?: Categoria
  ) => {
    try {
      if (editing) {
        const { error } = await supabase
          .from("categorias")
          .update({
            descripcion: categoria.descripcion,
            icon: categoria.icon,
          })
          .eq("id", editing.id);

        if (error) throw error;
        toast.success("Actualizado");
      } else {
        const { error } = await supabase
          .from("categorias")
          .insert([{ ...categoria, isActive: true }]);
        if (error) throw error;
        toast.success("Agregado");
      }
      fetchCategorias();
    } catch (err: any) {
      toast.error(editing ? "Error actualizando" : "Error agregando");
      console.error(err);
    }
  };

  // 🔹 Eliminar categoría
  const deleteCategoria = async (id: number) => {
    try {
      const { error } = await supabase.from("categorias").delete().eq("id", id);
      if (error) throw error;
      toast.success("Eliminado correctamente");
      fetchCategorias();
    } catch (err: any) {
      toast.error("Error eliminando");
      console.error(err);
    }
  };

  // 🔹 Activar / desactivar categoría
  const toggleEstado = async (categoria: Categoria) => {
    try {
      const { error } = await supabase
        .from("categorias")
        .update({ isActive: !categoria.isActive })
        .eq("id", categoria.id);

      if (error) throw error;
      toast.success(categoria.isActive ? "Desactivado" : "Activado");
      fetchCategorias();
    } catch (err: any) {
      toast.error("Error actualizando estado");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    fetchCategorias,
    addOrUpdateCategoria,
    deleteCategoria,
    toggleEstado,
  };
};