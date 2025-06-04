'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import { useCategorias, type Categoria } from '@/hooks/useCategorias';

import { CategoriaDialog } from './Components/CategoriaDialog';
import { CategoriaTable } from './Components/CategoriaTable';

export default function CategoriasAdmin() {
  const {
    categorias,
    addOrUpdateCategoria,
    deleteCategoria,
    toggleEstado,
  } = useCategorias();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);


  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Categorías</h1>
        <CategoriaDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          onSubmit={addOrUpdateCategoria}
          editing={editingCategoria}
        />
      </div>

      <div className="overflow-x-auto">
        <CategoriaTable
          categorias={categorias}
          onEdit={(cat) => {
            setEditingCategoria(cat);
            setDialogOpen(true);
          }}
          onDelete={deleteCategoria}
          onToggle={toggleEstado}
        />
      </div>
    </div>
  );
}
