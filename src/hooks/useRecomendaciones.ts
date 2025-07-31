// src/hooks/useRecomendaciones.ts
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Profile {
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

export interface Recomendacion {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: Profile;
}

export function useRecomendaciones() {
  const [resenas, setResenas] = useState<Recomendacion[]>([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/recomendaciones/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const fetchResenas = async () => {
  setLoading(true);
  try {
    const res = await fetch(API_URL, { headers });

    const body = await res.text(); // <-- usa .text() para ver el error si es JSON o HTML
    console.log("Respuesta cruda:", body);

    if (!res.ok) throw new Error("Error al obtener recomendaciones");

    const data = JSON.parse(body);
    const dataArray = Array.isArray(data) ? data : [];

    const formateadas: Recomendacion[] = dataArray.map((item: any) => ({
      id: item.id,
      created_at: item.created_at,
      userid: item.userid,
      isActive: item.isActive,
      description: item.description,
      profile: {
        first_name: item.profile?.first_name ?? "Desconocido",
        last_name: item.profile?.last_name ?? "",
        avatar_url: item.profile?.avatar_url ?? "/default-avatar.png",
      },
    }));

    setResenas(formateadas);
  } catch (error) {
    console.error(error);
    toast.error("Error al cargar recomendaciones");
    setResenas([]);
  } finally {
    setLoading(false);
  }
};



  const enviarResena = async (userid?: string) => {
    if (!nuevaResena.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          description: nuevaResena,
          userid,
          isActive: false,
        }),
      });
      if (!res.ok) throw new Error("Error creando recomendación");
      toast.success("✅ Enviada para revisión.");
      setNuevaResena("");
      fetchResenas();
    } catch {
      toast.error("❌ No se pudo enviar la recomendación.");
    }
  };

  const eliminarResena = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error();
      toast.success("🗑️ Eliminada correctamente.");
      fetchResenas();
    } catch {
      toast.error("❌ No se pudo eliminar.");
    }
  };

  const editarResena = async (
    id: number,
    nuevaDescripcion: string,
    nuevoEstado: boolean
  ) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          description: nuevaDescripcion,
          isActive: nuevoEstado,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("✏️ Recomendación actualizada.");
      fetchResenas();
    } catch {
      toast.error("❌ Error al editar.");
    }
  };

  const aprobarResena = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ isActive: true }),
      });
      if (!res.ok) throw new Error();
      toast.success("✅ Recomendación aprobada.");
      fetchResenas();
    } catch {
      toast.error("❌ No se pudo aprobar.");
    }
  };

  useEffect(() => {
    fetchResenas();
  }, []);

  return {
    resenas,
    nuevaResena,
    setNuevaResena,
    enviarResena,
    eliminarResena,
    editarResena,
    aprobarResena,
    loading,
    fetchResenas,
  };
}
