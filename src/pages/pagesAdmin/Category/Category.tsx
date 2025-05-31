'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faPen, faTrash, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, Toaster } from 'sonner';
import * as LucideIcons from 'lucide-react';
import React from 'react';

interface Categoria {
  id: number;
  descripcion: string;
  isActive: boolean;
  icon: string;
}

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState({ descripcion: '', icon: '' });
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const showAlert = (type: 'error' | 'success', message: string) => {
    if (type === 'error') {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const fetchCategorias = async () => {
    const { data, error } = await supabase.from('categoriatab').select('*');
    if (error) {
      console.error(error);
      showAlert('error', 'Error cargando categorías');
    } else {
      setCategorias(data || []);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.descripcion.trim()) {
      showAlert('error', 'La descripción es obligatoria');
      return;
    }

    if (editingCategoria) {
      const { error } = await supabase
        .from('categoriatab')
        .update({ descripcion: form.descripcion, icon: form.icon })
        .eq('id', editingCategoria.id);

      if (error) {
        showAlert('error', 'Error actualizando categoría');
        return;
      }

      showAlert('success', 'Categoría actualizada');
    } else {
      const { error } = await supabase.from('categoriatab').insert([
        { descripcion: form.descripcion, icon: form.icon, isActive: true },
      ]);

      if (error) {
        showAlert('error', 'Error agregando categoría');
        return;
      }

      showAlert('success', 'Categoría agregada');
    }

    setOpen(false);
    setForm({ descripcion: '', icon: '' });
    setEditingCategoria(null);
    fetchCategorias();
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setForm({ descripcion: categoria.descripcion, icon: categoria.icon || '' });
    setOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    const { error } = await supabase
      .from('categoriatab')
      .delete()
      .eq('id', selectedDeleteId);

    if (error) {
      showAlert('error', 'Error al eliminar categoría');
      return;
    }

    showAlert('success', 'Categoría eliminada');
    setSelectedDeleteId(null);
    setDeleteDialogOpen(false);
    fetchCategorias();
  };

  const toggleActive = async (categoria: Categoria) => {
    const { error } = await supabase
      .from('categoriatab')
      .update({ isActive: !categoria.isActive })
      .eq('id', categoria.id);

    if (error) {
      showAlert('error', 'Error actualizando estado');
    } else {
      showAlert('success', `Categoría ${!categoria.isActive ? 'activada' : 'desactivada'}`);
      fetchCategorias();
    }
  };

  return (
    <div className="p-6">
      <Toaster />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Categorías</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategoria(null);
                setForm({ descripcion: '', icon: '' });
              }}
            >
              Agregar Categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
              />
              <Input
                name="icon"
                placeholder="Nombre del ícono de Lucide (ej. 'Carrot')"
                value={form.icon}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}>{editingCategoria ? 'Actualizar' : 'Agregar'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Ícono</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => {
              
              return (
                <tr key={cat.id}>
                  <td className="border px-4 py-2">{cat.id}</td>
                  <td className="border px-4 py-2">{cat.descripcion}</td>
                  <td className="border px-4 py-2 text-center">
  {cat.icon && cat.icon in LucideIcons ? (
    React.createElement(LucideIcons[cat.icon as keyof typeof LucideIcons] as React.ElementType, {
      className: 'w-5 h-5 mx-auto',
    })
  ) : (
    <span className="text-xs text-red-500">Icono inválido</span>
  )}
</td>

                  <td className="border px-4 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(cat)}
                      title={cat.isActive ? 'Desactivar' : 'Activar'}
                    >
                      <FontAwesomeIcon icon={cat.isActive ? faToggleOn : faToggleOff} />
                    </Button>
                  </td>
                  <td className="border px-4 py-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(cat)} className="mr-2">
                      <FontAwesomeIcon icon={faPen} />
                    </Button>

                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(cat.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <p>Esto eliminará la categoría permanentemente.</p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
