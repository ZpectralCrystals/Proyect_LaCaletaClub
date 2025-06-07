import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  busqueda: string;
  setBusqueda: (v: string) => void;
  filtro: "todos" | "activos" | "inactivos";
  setFiltro: (v: "todos" | "activos" | "inactivos") => void;
  totalActivos: number;
  totalInactivos: number;
}

export function RecomendacionFilters({
  busqueda,
  setBusqueda,
  filtro,
  setFiltro,
  totalActivos,
  totalInactivos,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <Input
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="max-w-xs"
      />
      <div className="flex gap-2">
        <Button variant={filtro === "todos" ? "default" : "outline"} onClick={() => setFiltro("todos")}>
          Todos
        </Button>
        <Button variant={filtro === "activos" ? "default" : "outline"} onClick={() => setFiltro("activos")}>
          Activos ({totalActivos})
        </Button>
        <Button variant={filtro === "inactivos" ? "default" : "outline"} onClick={() => setFiltro("inactivos")}>
          Inactivos ({totalInactivos})
        </Button>
      </div>
    </div>
  );
}
