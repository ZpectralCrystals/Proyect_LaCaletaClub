import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type{ Recomendacion, RecomendacionRaw } from "@/types/types";
import { RecomendacionCard } from "./RecomendacionCard";
import { RecomendacionEditor } from "./RecomendacionEditor";
import { RecomendacionFilters } from "./RecomendacionFilters";


export default function RecomendacionesAdmin() {
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Estados para edición
  const [editOpen, setEditOpen] = useState(false);
  const [recomendacionEdit, setRecomendacionEdit] = useState<Recomendacion | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [editError, setEditError] = useState("");

  // Estados para búsqueda y filtro
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activos" | "inactivos">("todos");

  // Cargar desde Supabase
  useEffect(() => {
    fetchRecomendaciones();
  }, []);

  const fetchRecomendaciones = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("recomendacionestab")
      .select(`
        id, created_at, userid, isActive, description,
        profile:profiles!userid(first_name, last_name, avatar_url)
      `);

    if (error) {
      console.error("❌ Error al cargar recomendaciones:", error);
      setLoading(false);
      return;
    }

    const formateadas: Recomendacion[] = (data as unknown as RecomendacionRaw[]).map((item) => ({
      id: item.id,
      created_at: item.created_at,
      userid: item.userid,
      isActive: item.isActive,
      description: item.description,
      profile: {
        first_name: item.profile?.first_name ?? "Sin nombre",
        last_name: item.profile?.last_name ?? "",
        avatar_url: item.profile?.avatar_url ?? "/default-avatar.png",
      },
    }));

    setRecomendaciones(formateadas);
    setLoading(false);
  };

  const toggleEstado = async (id: number, estadoActual: boolean) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .update({ isActive: !estadoActual })
      .eq("id", id);

    if (error) {
      console.error("❌ Error al cambiar estado:", error);
      return;
    }

    fetchRecomendaciones();
  };

  const eliminarRecomendacion = async (id: number) => {
    const { error } = await supabase
      .from("recomendacionestab")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Error al eliminar recomendación:", error);
      return;
    }

    fetchRecomendaciones();
  };

  const openEditModal = (r: Recomendacion) => {
    setRecomendacionEdit(r);
    setEditDescription(r.description);
    setEditActive(r.isActive);
    setEditError("");
    setEditOpen(true);
  };

  const actualizarRecomendacion = async () => {
    if (!editDescription.trim()) {
      setEditError("La descripción no puede estar vacía.");
      return;
    }

    if (!recomendacionEdit) return;

    const { error } = await supabase
      .from("recomendacionestab")
      .update({ description: editDescription, isActive: editActive })
      .eq("id", recomendacionEdit.id);

    if (error) {
      console.error("❌ Error al actualizar recomendación:", error);
      return;
    }

    setEditOpen(false);
    await fetchRecomendaciones();
  };

  // Filtrar por texto y estado
  const recomendacionesFiltradas = useMemo(() => {
    return recomendaciones.filter((r) => {
      const coincideBusqueda = `${r.profile.first_name} ${r.profile.last_name}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideEstado =
        filtroEstado === "todos"
          ? true
          : filtroEstado === "activos"
          ? r.isActive
          : !r.isActive;

      return coincideBusqueda && coincideEstado;
    });
  }, [recomendaciones, busqueda, filtroEstado]);

  const totalActivos = recomendaciones.filter((r) => r.isActive).length;
  const totalInactivos = recomendaciones.length - totalActivos;

  return (
    <main className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-sky-700">Panel de Recomendaciones</h1>

        <RecomendacionFilters
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtro={filtroEstado}
          setFiltro={setFiltroEstado}
          totalActivos={totalActivos}
          totalInactivos={totalInactivos}
        />
      </header>

      {loading ? (
        <p className="text-gray-600">Cargando recomendaciones...</p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recomendacionesFiltradas.map((r) => (
            <RecomendacionCard
              key={r.id}
              data={r}
              onToggle={() => toggleEstado(r.id, r.isActive)}
              onEdit={() => openEditModal(r)}
              onDelete={() => eliminarRecomendacion(r.id)}
            />
          ))}
        </section>
      )}

      {/* Modal de edición */}
      <RecomendacionEditor
        open={editOpen}
        onClose={() => setEditOpen(false)}
        description={editDescription}
        isActive={editActive}
        onChangeDescription={setEditDescription}
        onToggleActive={setEditActive}
        onSave={actualizarRecomendacion}
        error={editError}
      />
    </main>
  );
}
