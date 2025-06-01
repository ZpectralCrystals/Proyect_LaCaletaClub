<<<<<<< HEAD
export default function RecomendacionesAdmin() {
    return(
        <>
        Recomendaciones
        </>
    )
}
=======
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

interface Recomendacion {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

export default function RecomendacionesAdmin() {
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecomendaciones = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("recomendacionestab")
      .select(
        `id, created_at, userid, "isActive", description, profile:userid (first_name, last_name, avatar_url)`
      );

    if (!error && data) {
      const formateadas: Recomendacion[] = data.map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        userid: item.userid,
        isActive: item.isActive,
        description: item.description,
        profile: {
          first_name: item.profile?.first_name || "Sin nombre",
          last_name: item.profile?.last_name || "",
          avatar_url: item.profile?.avatar_url || "/default-avatar.png",
        },
      }));
      setRecomendaciones(formateadas);
    } else {
      console.error("Error cargando recomendaciones:", error);
    }
    setLoading(false);
  };

  const toggleEstado = async (id: number, estadoActual: boolean) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .update({ isActive: !estadoActual })
      .eq("id", id);

    if (!error) {
      fetchRecomendaciones();
    } else {
      console.error("Error al cambiar estado:", error);
    }
  };

  const eliminarRecomendacion = async (id: number) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchRecomendaciones();
    } else {
      console.error("Error al eliminar recomendación:", error);
    }
  };

  useEffect(() => {
    fetchRecomendaciones();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Panel de Recomendaciones</h1>

      {loading ? (
        <p className="text-gray-600">Cargando recomendaciones...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {recomendaciones.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow p-4 flex gap-4 items-start">
              <img
                src={r.profile.avatar_url}
                alt={r.profile.first_name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sky-800 font-semibold">
                  {r.profile.first_name} {r.profile.last_name}
                </p>
                <p className="text-gray-700 text-sm mt-1">{r.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Fecha: {new Date(r.created_at).toLocaleString()}
                </p>

                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={r.isActive}
                      onCheckedChange={() => toggleEstado(r.id, r.isActive)}
                    />
                    <span className="text-sm">
                      {r.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => eliminarRecomendacion(r.id)}
                    size="icon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
>>>>>>> timothy-coder
