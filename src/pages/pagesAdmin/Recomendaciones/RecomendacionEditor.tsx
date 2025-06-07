import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  description: string;
  isActive: boolean;
  onChangeDescription: (v: string) => void;
  onToggleActive: (v: boolean) => void;
  onClose: () => void;
  onSave: () => void;
  error?: string;
}

export function RecomendacionEditor({
  open,
  description,
  isActive,
  onChangeDescription,
  onToggleActive,
  onClose,
  onSave,
  error,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Recomendación</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="estado">Estado</Label>
            <Switch
              id="estado"
              checked={isActive}
              onCheckedChange={onToggleActive}
            />
            <span>{isActive ? "Activo" : "Inactivo"}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
