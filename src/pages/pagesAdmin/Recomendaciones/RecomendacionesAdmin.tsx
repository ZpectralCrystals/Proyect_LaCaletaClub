import { useMemo, useState, useEffect } from "react";
import { useRecomendaciones } from "@/hooks/useRecomendaciones";
import { RecomendacionCard } from "./RecomendacionCard";
import { RecomendacionEditor } from "./RecomendacionEditor";
import { RecomendacionFilters } from "./RecomendacionFilters";

export default function RecomendacionesAdmin() {
  const {
  resenas,
  fetchResenas,
  eliminarResena,
  editarResena,
  aprobarResena,
  nuevaResena,
  setNuevaResena,
  loading, // 👈 AGREGA ESTO
} = useRecomendaciones();


  const [editOpen, setEditOpen] = useState(false);
  const [recomendacionEdit, setRecomendacionEdit] = useState<any>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [editError, setEditError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activos" | "inactivos">("todos");

  useEffect(() => {
    fetchResenas();
  }, []);

  const openEditModal = (r: any) => {
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

    await editarResena(recomendacionEdit.id, editDescription, editActive);
    setEditOpen(false);
  };

  const recomendacionesFiltradas = useMemo(() => {
  if (!Array.isArray(resenas)) return [];

  return resenas.filter((r) => {
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
}, [resenas, busqueda, filtroEstado]);


  const totalActivos = resenas.filter((r) => r.isActive).length;
  const totalInactivos = resenas.length - totalActivos;

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
  onToggle={(checked) => editarResena(r.id, r.description, checked)} // Alternar estado
  onEdit={() => openEditModal(r)}
  onDelete={() => eliminarResena(r.id)}
/>

          ))}
        </section>
      )}

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
