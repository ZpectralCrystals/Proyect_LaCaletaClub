'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';

interface Categoria {
  id: number;
  descripcion: string;
}

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState({ descripcion: '' });
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | null>(null);

  const showAlert = (type: 'error' | 'success', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

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
        .update({ descripcion: form.descripcion })
        .eq('id', editingCategoria.id);

      if (error) {
        showAlert('error', 'Error actualizando categoría');
        return;
      }

      showAlert('success', 'Categoría actualizada');
    } else {
      const { error } = await supabase.from('categoriatab').insert([{ descripcion: form.descripcion }]);

      if (error) {
        showAlert('error', 'Error agregando categoría');
        return;
      }

      showAlert('success', 'Categoría agregada');
    }

    setOpen(false);
    setForm({ descripcion: '' });
    setEditingCategoria(null);
    fetchCategorias();
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setForm({ descripcion: categoria.descripcion });
    setOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    const { error } = await supabase.from('categoriatab').delete().eq('id', selectedDeleteId);
    if (error) {
      showAlert('error', 'Error eliminando categoría');
      return;
    }
    showAlert('success', 'Categoría eliminada');
    setSelectedDeleteId(null);
    setDeleteDialogOpen(false);
    fetchCategorias();
  };

  return (
    <div className="p-6">
      {alertMessage && (
        <Alert variant={alertType === 'error' ? 'destructive' : 'default'} className="shadow-lg">
          <AlertTitle>{alertType === 'error' ? 'Error' : 'Éxito'}</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Categorías</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategoria(null);
                setForm({ descripcion: '' });
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
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td className="border px-4 py-2">{cat.id}</td>
                <td className="border px-4 py-2">{cat.descripcion}</td>
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
                        <p>Esta acción no se puede deshacer.</p>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
