// src/hooks/useDescuentos.ts
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Descuento {
  id: number;
  name: string;
  descuento: number;
  producto: string; // O un objeto Producto si es necesario
  categoria: string; // O un objeto Categoria
  dia: number | null;
  imagen: string;
  isActive: boolean;
  type: number;
}

export function useDescuentos() {
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://127.0.0.1:8000/api/desc/";  // La URL correcta
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const fetchDescuentos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers });
      const body = await res.json();

      if (!res.ok) {
        throw new Error("Error al obtener descuentos");
      }

      setDescuentos(body); // Asume que los datos son una lista de descuentos
    } catch (error) {
      toast.error("Error al cargar los descuentos");
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
  };
}
