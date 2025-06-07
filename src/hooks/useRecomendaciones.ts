// src/hooks/useRecomendaciones.ts

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

// Tipos estrictos
interface Profile {
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

interface RecomendacionRaw {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  } | null;
}

// Hook personalizado para manejar lógica de recomendaciones
export function useRecomendaciones(userId?: string) {
  const [resenas, setResenas] = useState<Recomendacion[]>([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar automáticamente al montar
  useEffect(() => {
    fetchResenas();
  }, []);

  // Obtener recomendaciones activas
  const fetchResenas = async () => {
    const { data, error } = await supabase
      .from("recomendacionestab")
      .select(`
        id, created_at, userid, isActive, description,
        profile:profiles!userid(first_name, last_name, avatar_url)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar recomendaciones");
      return;
    }

    const formateadas: Recomendacion[] = (data as unknown as RecomendacionRaw[]).map((item) => {
      const {
        first_name = "",
        last_name = "",
        avatar_url = "/default-avatar.png",
      } = item.profile ?? {};
      return {
        id: item.id,
        created_at: item.created_at,
        userid: item.userid,
        isActive: item.isActive,
        description: item.description,
        profile: {
          first_name,
          last_name,
          avatar_url: avatar_url || "/default-avatar.png",
        },
      };
    });

    setResenas(formateadas);
  };

  // Crear una nueva recomendación
  const enviarResena = async () => {
    if (!nuevaResena.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("recomendacionestab").insert({
      description: nuevaResena,
      userid: userId,
      isActive: false, // se debe aprobar
    });

    setLoading(false);

    if (error) {
      toast.error("❌ No se pudo enviar la recomendación.");
    } else {
      setNuevaResena("");
      toast.success("✅ Enviada para revisión.");
      fetchResenas();
    }
  };

  // Eliminar una recomendación por ID
  const eliminarResena = async (id: number) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("❌ No se pudo eliminar.");
    } else {
      toast.success("🗑️ Eliminada correctamente.");
      fetchResenas();
    }
  };

  // Editar descripción de una recomendación
  const editarResena = async (id: number, nuevaDescripcion: string) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .update({ description: nuevaDescripcion })
      .eq("id", id);

    if (error) {
      toast.error("❌ Error al editar.");
    } else {
      toast.success("✏️ Recomendación actualizada.");
      fetchResenas();
    }
  };

  // Aprobar recomendación pendiente (activar)
  const aprobarResena = async (id: number) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .update({ isActive: true })
      .eq("id", id);

    if (error) {
      toast.error("❌ No se pudo aprobar.");
    } else {
      toast.success("✅ Recomendación aprobada.");
      fetchResenas();
    }
  };

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
