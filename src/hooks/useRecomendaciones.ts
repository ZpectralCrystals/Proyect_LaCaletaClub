import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export interface Perfil {
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export interface Recomendacion {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: Perfil | null;
}

export function useRecomendaciones(userid?: string) {
  const [resenas, setResenas] = useState<Recomendacion[]>([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener todas las recomendaciones activas
  const fetchResenas = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recomendaciones")
        .select(`
          id,
          created_at,
          userid,
          "isActive",
          description,
          profile:userid(first_name,last_name,avatar_url)  -- join con profiles
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setResenas(data as Recomendacion[]);
    } catch (err: any) {
      toast.error("Error al cargar recomendaciones");
      console.error(err);
      setResenas([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Enviar una nueva recomendación (inactiva por defecto)
  const enviarResena = async () => {
    if (!nuevaResena.trim()) return;

    if (!userid) {
      toast.error("No se encontró el usuario para enviar la recomendación.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("recomendaciones").insert([
        {
          description: nuevaResena,
          userid,
          "isActive": false,
        },
      ]);

      if (error) throw error;

      toast.success("✅ Recomendación enviada para revisión.");
      setNuevaResena("");
      fetchResenas();
    } catch (err: any) {
      toast.error("❌ No se pudo enviar la recomendación.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar recomendación
  const eliminarResena = async (id: number) => {
    try {
      const { error } = await supabase.from("recomendaciones").delete().eq("id", id);
      if (error) throw error;

      toast.success("🗑️ Eliminada correctamente.");
      fetchResenas();
    } catch (err: any) {
      toast.error("❌ No se pudo eliminar.");
      console.error(err);
    }
  };

  // 🔹 Editar recomendación
  const editarResena = async (id: number, nuevaDescripcion: string, nuevoEstado: boolean) => {
    try {
      const { error } = await supabase
        .from("recomendaciones")
        .update({ description: nuevaDescripcion, "isActive": nuevoEstado })
        .eq("id", id);

      if (error) throw error;

      toast.success("✏️ Recomendación actualizada.");
      fetchResenas();
    } catch (err: any) {
      toast.error("❌ Error al editar.");
      console.error(err);
    }
  };

  // 🔹 Aprobar recomendación (solo admins)
  const aprobarResena = async (id: number) => {
    try {
      const { error } = await supabase
        .from("recomendaciones")
        .update({ "isActive": true })
        .eq("id", id);

      if (error) throw error;

      toast.success("✅ Recomendación aprobada.");
      fetchResenas();
    } catch (err: any) {
      toast.error("❌ No se pudo aprobar.");
      console.error(err);
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