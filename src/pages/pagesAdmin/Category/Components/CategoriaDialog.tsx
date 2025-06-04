import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Categoria } from '@/hooks/useCategorias';
import { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (form: { descripcion: string; icon: string }, editing?: Categoria) => void;
  editing: Categoria | null;

}

export function CategoriaDialog({ open, setOpen, onSubmit, editing }: Props) {
  const [form, setForm] = useState({ descripcion: '', icon: '' });

  useEffect(() => {
  if (editing != null) {
    setForm({ descripcion: editing.descripcion, icon: editing.icon });
  } else {
    setForm({ descripcion: '', icon: '' });
  }
}, [editing]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setForm({ descripcion: '', icon: '' })}>
          Agregar Categoría
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? 'Editar' : 'Nueva'} Categoría</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <Input
            name="icon"
            placeholder="Ícono Lucide"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          />
          <Button onClick={() => onSubmit(form, editing ?? undefined)}>
  {editing ? 'Actualizar' : 'Agregar'}
</Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
