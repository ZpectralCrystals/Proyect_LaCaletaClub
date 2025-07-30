import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Producto {
  id: number;
  name: string;
  type: number;
  price: number;
  image: string;
  description: string;
  varietyOptions: string[];
  isActive: boolean;
  isFavorite: boolean;
}

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/productos/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers });
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProductos(data);
    } catch {
      toast.error("Error cargando productos");
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateProducto = async (
    producto: Omit<Producto, "id" | "isActive" | "isFavorite">,
    editing?: Producto
  ) => {
    const payload = JSON.stringify({
      ...producto,
      varietyOptions: producto.varietyOptions,
      isActive: true,
      isFavorite: true,
    });

    try {
      const res = editing
        ? await fetch(`${API_URL}${editing.id}/`, {
            method: "PATCH",
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
      fetchProductos();
    } catch {
      toast.error(editing ? "Error actualizando" : "Error agregando");
    }
  };

  const deleteProducto = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error();
      toast.success("Producto eliminado");
      fetchProductos();
    } catch {
      toast.error("Error eliminando producto");
    }
  };

  const toggleCampo = async (
  producto: Producto,
  campo: "isActive" | "isFavorite"
) => {
  if (!producto?.id) {
    toast.error("ID no válido para actualizar campo");
    return;
  }

  try {
    const res = await fetch(`${API_URL}${producto.id}/`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ [campo]: !producto[campo] }),
    });
    if (!res.ok) throw new Error();
    toast.success("Campo actualizado");
    fetchProductos();
  } catch {
    toast.error("Error actualizando campo");
  }
};


  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    fetchProductos,
    addOrUpdateProducto,
    deleteProducto,
    toggleCampo,
  };
};
