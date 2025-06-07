import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";


// Tipos estrictos
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

interface RecomendacionRaw {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
}

export default function RecomendacionesAdmin() {
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Modal edición
  const [editOpen, setEditOpen] = useState(false);
  const [recomendacionEdit, setRecomendacionEdit] = useState<Recomendacion | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [editError, setEditError] = useState("");

  // Búsqueda y filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activos" | "inactivos">("todos");

  // Fetch inicial
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

  // 🔍 Filtrado y búsqueda
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
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-sky-700">Panel de Recomendaciones</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Input
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="max-w-xs"
          />

          <div className="flex gap-2">
            <Button
              variant={filtroEstado === "todos" ? "default" : "outline"}
              onClick={() => setFiltroEstado("todos")}
            >
              Todos
            </Button>
            <Button
              variant={filtroEstado === "activos" ? "default" : "outline"}
              onClick={() => setFiltroEstado("activos")}
            >
              Activos ({totalActivos})
            </Button>
            <Button
              variant={filtroEstado === "inactivos" ? "default" : "outline"}
              onClick={() => setFiltroEstado("inactivos")}
            >
              Inactivos ({totalInactivos})
            </Button>
          </div>
        </div>
      </header>

      {loading ? (
        <p className="text-gray-600">Cargando recomendaciones...</p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recomendacionesFiltradas.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-xl shadow p-4 flex gap-4 items-start"
            >
              <img
                src={r.profile.avatar_url}
                alt={`Avatar de ${r.profile.first_name}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-sky-800 font-semibold">
                  {r.profile.first_name} {r.profile.last_name}
                </h2>
                <p className="text-gray-700 text-sm mt-1">{r.description}</p>
                <time dateTime={r.created_at} className="text-xs text-gray-400 mt-1 block">
                  Fecha: {new Date(r.created_at).toLocaleString()}
                </time>
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <label className="flex items-center gap-2">
                    <Switch
                      checked={r.isActive}
                      onCheckedChange={() => toggleEstado(r.id, r.isActive)}
                    />
                    <span className="text-sm">{r.isActive ? "Activo" : "Inactivo"}</span>
                  </label>
                  <Button size="sm" variant="outline" onClick={() => openEditModal(r)}>
                    Editar
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => eliminarRecomendacion(r.id)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Modal de edición */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Recomendación</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              {editError && <p className="text-sm text-red-500">{editError}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Switch
                id="estado"
                checked={editActive}
                onCheckedChange={setEditActive}
              />
              <span>{editActive ? "Activo" : "Inactivo"}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={actualizarRecomendacion}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
