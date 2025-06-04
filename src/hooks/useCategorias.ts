import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface Categoria {
  id: number;
  descripcion: string;
  isActive: boolean;
  icon: string;
}

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategorias = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('categoriatab').select('*');
    if (error) {
      toast.error('Error cargando categorías');
    } else {
      setCategorias(data || []);
    }
    setLoading(false);
  };

  const addOrUpdateCategoria = async (
    categoria: Omit<Categoria, 'id' | 'isActive'>,
    editing?: Categoria
  ) => {
    const payload = { descripcion: categoria.descripcion, icon: categoria.icon };
    const { error } = editing
      ? await supabase.from('categoriatab').update(payload).eq('id', editing.id)
      : await supabase
          .from('categoriatab')
          .insert([{ ...payload, isActive: true }]);

    if (error) {
      toast.error(editing ? 'Error actualizando' : 'Error agregando');
    } else {
      toast.success(editing ? 'Actualizado' : 'Agregado');
      fetchCategorias();
    }
  };

  const deleteCategoria = async (id: number) => {
    const { error } = await supabase.from('categoriatab').delete().eq('id', id);
    if (error) toast.error('Error eliminando');
    else {
      toast.success('Eliminado correctamente');
      fetchCategorias();
    }
  };

  const toggleEstado = async (categoria: Categoria) => {
    const { error } = await supabase
      .from('categoriatab')
      .update({ isActive: !categoria.isActive })
      .eq('id', categoria.id);
    if (!error) {
      toast.success(categoria.isActive ? 'Desactivado' : 'Activado');
      fetchCategorias();
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    fetchCategorias,
    addOrUpdateCategoria,
    deleteCategoria,
    toggleEstado,
  };
};
