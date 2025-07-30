import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Categoria {
  id: number;
  descripcion: string;
  isActive: boolean;
  icon: string;
}

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/categorias/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers });
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data = await res.json();
      setCategorias(data);
    } catch {
      toast.error("Error cargando categorías");
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateCategoria = async (
    categoria: Omit<Categoria, "id" | "isActive">,
    editing?: Categoria
  ) => {
    const payload = JSON.stringify({
      descripcion: categoria.descripcion,
      icon: categoria.icon,
      isActive: true,
    });

    try {
      const res = editing
        ? await fetch(`${API_URL}${editing.id}/`, {
            method: "PUT",
            headers,
            body: payload,
          })
        : await fetch(API_URL, {
            method: "POST",
            headers,
            body: payload,
          });

      if (!res.ok) throw new Error();
      toast.success(editing ? "Actualizado" : "Agregado");
      fetchCategorias();
    } catch {
      toast.error(editing ? "Error actualizando" : "Error agregando");
    }
  };

  const deleteCategoria = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error();
      toast.success("Eliminado correctamente");
      fetchCategorias();
    } catch {
      toast.error("Error eliminando");
    }
  };

  const toggleEstado = async (categoria: Categoria) => {
    try {
      const res = await fetch(`${API_URL}${categoria.id}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ isActive: !categoria.isActive }),
      });
      if (!res.ok) throw new Error();
      toast.success(categoria.isActive ? "Desactivado" : "Activado");
      fetchCategorias();
    } catch {
      toast.error("Error actualizando estado");
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
