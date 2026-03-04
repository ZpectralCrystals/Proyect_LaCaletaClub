import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export interface Producto {
  id: number;
  nombre: string;
  precio?: number;
}

export interface Categoria {
  id: number;
  descripcion: string;
}

export interface Descuento {
  id: number;
  name: string;
  descuento: number;
  producto: Producto | null;
  categoria: Categoria | null;
  dia: { id: number; nombre: string } | null;
  imagen: string;
  isActive: boolean;
  type: { id: number; nombre: string } | null;
}

export function useDescuentos() {
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDescuentos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("descuentos")
        .select(`
          id,
          name,
          descuento,
          imagen,
          "isActive",
          type:type(id,nombre),
          producto:id_producto(id,nombre),
          categoria:id_category(id,descripcion),
          dia:id_dia(id,nombre)
        `)
        .eq("isActive", true)
        .order("id", { ascending: true });

      if (error) throw error;

      setDescuentos(data as Descuento[]);
    } catch (err: any) {
      toast.error("Error al cargar los descuentos");
      console.error(err);
      setDescuentos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDescuentos();
  }, []);

  return {
    descuentos,
    loading,
    fetchDescuentos,
  };
}