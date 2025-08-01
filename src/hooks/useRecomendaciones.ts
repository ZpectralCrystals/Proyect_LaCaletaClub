import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useRecomendaciones(userid?: string) {
  const [resenas, setResenas] = useState<any[]>([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/recomendaciones/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  // Función para obtener las recomendaciones
  const fetchResenas = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers });
      const body = await res.json(); // Usamos .json() para obtener los datos correctamente
      if (!res.ok) throw new Error("Error al obtener recomendaciones");

      // Si la respuesta es válida, formateamos las recomendaciones
      const formateadas = body.map((item: any) => ({
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

  // Función para enviar una nueva recomendación
  const enviarResena = async () => {
    if (!nuevaResena.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          description: nuevaResena,
          userid: userid,  // Asegúrate de que 'userid' sea válido
          isActive: false,
        }),
      });

      if (!res.ok) throw new Error("Error creando recomendación");
      toast.success("✅ Recomendación enviada para revisión.");
      setNuevaResena(""); // Limpiamos el campo de entrada
      fetchResenas();  // Actualizamos las recomendaciones después de enviar una nueva
    } catch (error) {
      toast.error("❌ No se pudo enviar la recomendación.");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar recomendación
  const eliminarResena = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error();
      toast.success("🗑️ Eliminada correctamente.");
      fetchResenas();  // Volver a cargar las recomendaciones
    } catch {
      toast.error("❌ No se pudo eliminar.");
    }
  };

  // Editar recomendación
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
      fetchResenas();  // Volver a cargar las recomendaciones
    } catch {
      toast.error("❌ Error al editar.");
    }
  };

  // Aprobar recomendación
  const aprobarResena = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ isActive: true }),
      });
      if (!res.ok) throw new Error();
      toast.success("✅ Recomendación aprobada.");
      fetchResenas();  // Volver a cargar las recomendaciones
    } catch {
      toast.error("❌ No se pudo aprobar.");
    }
  };

  // Cargar las recomendaciones al montar el componente
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
