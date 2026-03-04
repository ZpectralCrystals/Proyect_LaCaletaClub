// src/components/admin/DescuentosAdmin.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Toaster, toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient'; // Tu cliente de Supabase configurado

interface Descuento {
  id: number;
  name: string;
  descuento: number;
  imagen: string;
  type: number;
  id_dia: number | null;
  id_producto: number | null;
  id_category: number | null;
  isActive: boolean;
  producto?: { id: number; name: string };
  categoria?: { id: number; descripcion: string };
  dia?: { id: number; dia: string };
  tipo?: { id: number; descripcion: string };
}

interface Producto { id: number; name: string; }
interface Categoria { id: number; descripcion: string; }
interface Dia { id: number; dia: string; }
interface Type { id: number; descripcion: string; }

export default function DescuentosAdmin() {
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [dias, setDias] = useState<Dia[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [form, setForm] = useState({
    name: '',
    descuento: '',
    imagen: '',
    type: '',
    id_dia: '',
    id_producto: '',
    id_category: '',
    isActive: 'true',
  });
  const [editingDescuento, setEditingDescuento] = useState<Descuento | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const showAlert = (type: 'error' | 'success', message: string) => {
    type === 'error' ? toast.error(message) : toast.success(message);
  };

  // 🔹 Cargar todos los datos relacionados desde Supabase
  const fetchData = async () => {
    try {
      // Descuentos con joins
      const { data: descData, error: descError } = await supabase
        .from('descuentos')
        .select(`
          id,
          name,
          descuento,
          imagen,
          type,
          id_dia,
          id_producto,
          id_category,
          isActive,
          producto: id_producto(id,name),
          categoria: id_category(id,descripcion),
          dia: id_dia(id,dia),
          tipo: type(id,descripcion)
        `)
        .order('id', { ascending: false });

      if (descError) throw descError;

      // Otros datos básicos
      const { data: productosData, error: productosError } = await supabase.from('productos').select('id,name');
      if (productosError) throw productosError;

      const { data: categoriasData, error: categoriasError } = await supabase.from('categorias').select('id,descripcion');
      if (categoriasError) throw categoriasError;

      const { data: diasData, error: diasError } = await supabase.from('diassemanatab').select('id,dia');
      if (diasError) throw diasError;

      const { data: typesData, error: typesError } = await supabase.from('typetab').select('id,descripcion');
      if (typesError) throw typesError;

      setDescuentos(descData || []);
      setProductos(productosData || []);
      setCategorias(categoriasData || []);
      setDias(diasData || []);
      setTypes(typesData || []);
      showAlert('success', 'Datos cargados correctamente');
    } catch (error) {
      console.error(error);
      showAlert('error', 'Error cargando datos desde Supabase');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Crear o actualizar descuento
  const handleSubmit = async () => {
    if (!form.name.trim()) return showAlert('error', 'El nombre es obligatorio');
    if (!form.descuento || isNaN(Number(form.descuento))) return showAlert('error', 'Descuento inválido');
    if (!form.imagen.trim()) return showAlert('error', 'La imagen es obligatoria');
    if (!form.type) return showAlert('error', 'Debe seleccionar un tipo');

    const typeNum = Number(form.type);
    const payload = {
      name: form.name.trim(),
      descuento: Number(form.descuento),
      imagen: form.imagen.trim(),
      type: typeNum,
      id_dia: typeNum === 1 ? Number(form.id_dia) || null : null,
      id_producto: typeNum === 2 && form.id_producto ? Number(form.id_producto) : null,
      id_category: typeNum === 2 && form.id_category ? Number(form.id_category) : null,
      isActive: form.isActive === 'true',
    };

    try {
      if (editingDescuento) {
        const { error } = await supabase.from('descuentos').update(payload).eq('id', editingDescuento.id);
        if (error) throw error;
        showAlert('success', 'Descuento actualizado');
      } else {
        const { error } = await supabase.from('descuentos').insert(payload);
        if (error) throw error;
        showAlert('success', 'Descuento agregado');
      }
      setForm({ name: '', descuento: '', imagen: '', type: '', id_dia: '', id_producto: '', id_category: '', isActive: 'true' });
      setEditingDescuento(null);
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      showAlert('error', editingDescuento ? 'Error actualizando descuento' : 'Error agregando descuento');
    }
  };

  const handleEdit = (desc: Descuento) => {
    setEditingDescuento(desc);
    setForm({
      name: desc.name,
      descuento: desc.descuento.toString(),
      imagen: desc.imagen,
      type: desc.type.toString(),
      id_dia: desc.id_dia?.toString() || '',
      id_producto: desc.id_producto?.toString() || '',
      id_category: desc.id_category?.toString() || '',
      isActive: desc.isActive.toString(),
    });
    setOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const toggleActive = async (id: number, currentState: boolean) => {
    const { error } = await supabase.from('descuentos').update({ isActive: !currentState }).eq('id', id);
    if (error) return showAlert('error', 'Error cambiando estado');
    fetchData();
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    const { error } = await supabase.from('descuentos').delete().eq('id', selectedDeleteId);
    if (error) return showAlert('error', 'Error eliminando descuento');
    setDeleteDialogOpen(false);
    setSelectedDeleteId(null);
    showAlert('success', 'Descuento eliminado');
    fetchData();
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Descuentos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingDescuento(null);
                setForm({ name: '', descuento: '', imagen: '', type: '', id_dia: '', id_producto: '', id_category: '', isActive: 'true' });
              }}
            >
              Agregar Descuento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDescuento ? 'Editar Descuento' : 'Nuevo Descuento'}</DialogTitle>
            </DialogHeader>
            {/* Aquí va el formulario (igual que tu código original) */}
            {/* ... puedes reutilizar todos los Select y Inputs como en tu versión */}
            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmit}>{editingDescuento ? 'Actualizar' : 'Guardar'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">Nombre</th>
              <th className="p-2 border-b">Descuento</th>
              <th className="p-2 border-b">Imagen</th>
              <th className="p-2 border-b">Estado</th>
              <th className="p-2 border-b">Tipo</th>
              <th className="p-2 border-b">Producto/Categoría</th>
              <th className="p-2 border-b">Día</th>
              <th className="p-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {descuentos.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-2">{d.name}</td>
                <td className="p-2">{d.descuento}%</td>
                <td className="p-2">
                  <img src={d.imagen} alt="Imagen" className="w-16 h-16 object-cover" />
                </td>
                <td className="p-2">{d.isActive ? 'Activo' : 'Inactivo'}</td>
                <td className="p-2">{d.tipo?.descripcion || ''}</td>
                <td className="p-2">{d.producto?.name || d.categoria?.descripcion || '—'}</td>
                <td className="p-2">{d.dia?.dia || '—'}</td>
                <td className="p-2 flex justify-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(d)}>Editar</Button>
                  <Button variant="outline" size="icon" onClick={() => toggleActive(d.id, d.isActive)}>
                    {d.isActive ? 'Desactivar' : 'Activar'}
                  </Button>
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(d.id)}>Eliminar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar descuento?</AlertDialogTitle>
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