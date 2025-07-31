import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Recomendacion } from "@/types/types";
import { Trash2 } from "lucide-react";

interface Props {
  data: Recomendacion;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function RecomendacionCard({ data, onToggle, onEdit, onDelete }: Props) {
  return (
    <article className="bg-white rounded-xl shadow p-4 flex gap-4 items-start">
      <img
        src={data.profile.avatar_url}
        alt={`Avatar de ${data.profile.first_name}`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h2 className="text-sky-800 font-semibold">
          {data.profile.first_name} {data.profile.last_name}
        </h2>
        <p className="text-gray-700 text-sm mt-1">{data.description}</p>
        <time dateTime={data.created_at} className="text-xs text-gray-400 mt-1 block">
          Fecha: {new Date(data.created_at).toLocaleString()}
        </time>
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <label className="flex items-center gap-2">
            <Switch
  checked={data.isActive}
  onCheckedChange={(checked) => onToggle(checked)} // Pasamos el nuevo estado
/>
<span className="text-sm">{data.isActive ? "Activo" : "Inactivo"}</span>

          </label>
          <Button size="sm" variant="outline" onClick={onEdit}>Editar</Button>
          <Button size="icon" variant="destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
