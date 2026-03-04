// hooks/useProductos.ts
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

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

  // 🔹 Obtener productos
  const fetchProductos = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Error cargando productos");
      setProductos([]);
    } else {
      setProductos((data as Producto[]) || []);
    }

    setLoading(false);
  };

  // 🔹 Crear o actualizar producto
  const addOrUpdateProducto = async (
    producto: Omit<Producto, "id" | "isActive" | "isFavorite">,
    editing?: Producto
  ) => {
    const payload = {
      ...producto,
      varietyOptions: producto.varietyOptions,
      isActive: true,
      isFavorite: true,
    };

    if (editing) {
      // UPDATE
      const { error } = await supabase
        .from("productos")
        .update(payload)
        .eq("id", editing.id);

      if (error) {
        toast.error("Error actualizando");
        return;
      }

      toast.success("Actualizado");
    } else {
      // INSERT
      const { error } = await supabase
        .from("productos")
        .insert(payload);

      if (error) {
        toast.error("Error agregando");
        return;
      }

      toast.success("Agregado");
    }

    fetchProductos();
  };

  // 🔹 Eliminar producto
  const deleteProducto = async (id: number) => {
    const { error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error eliminando producto");
      return;
    }

    toast.success("Producto eliminado");
    fetchProductos();
  };

  // 🔹 Toggle isActive / isFavorite
  const toggleCampo = async (
    producto: Producto,
    campo: "isActive" | "isFavorite"
  ) => {
    if (!producto?.id) {
      toast.error("ID no válido para actualizar campo");
      return;
    }

    const { error } = await supabase
      .from("productos")
      .update({ [campo]: !producto[campo] })
      .eq("id", producto.id);

    if (error) {
      toast.error("Error actualizando campo");
      return;
    }

    toast.success("Campo actualizado");
    fetchProductos();
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