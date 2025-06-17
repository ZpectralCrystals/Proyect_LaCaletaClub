// src/app/ProductsAdmin.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

import ProductForm from '@/pages/pagesAdmin/Products/components/ProductForm';
import ProductTable from '@/pages/pagesAdmin/Products/components/ProductTable';
import { ProductSearchBar } from '@/pages/pagesAdmin/Products/components/ProductSearchBar';

interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  description: string;
  image: string;
  varietyOptions: string[];
  isActive: boolean;
  isFavorite: boolean;
}

interface Category {
  id: number;
  descripcion: string;
}

interface FormState {
  name: string;
  type: string;
  price: string;
  description: string;
  image: string;
  varietyOptions: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<FormState>({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('productostab').select('*');
    if (error) toast.error('Error cargando productos');
    else setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categoriatab').select('*');
    if (error) toast.error('Error cargando categorías');
    else setCategories(data || []);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const categoryMap = useMemo(() => Object.fromEntries(categories.map(cat => [cat.id, cat.descripcion])), [categories]);

  const handleSubmit = async () => {
    const parsedType = parseInt(form.type);
    const parsedPrice = parseFloat(form.price);
    const varietyArray = form.varietyOptions.split(',').map(v => v.trim());
    const payload = { name: form.name, type: parsedType, price: parsedPrice, description: form.description, image: form.image, varietyOptions: varietyArray };

    if (!form.name || isNaN(parsedType) || isNaN(parsedPrice) || !form.image) return toast.error('Completa todos los campos obligatorios');

    let error;
    if (editingProduct) {
      ({ error } = await supabase.from('productostab').update(payload).eq('id', editingProduct.id));
    } else {
      ({ error } = await supabase.from('productostab').insert([{ ...payload, isActive: true }]));
    }

    if (error) return toast.error('Error al guardar');

    toast.success('Guardado con éxito');
    setOpen(false);
    setForm({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' });
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      type: product.type.toString(),
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      varietyOptions: product.varietyOptions.join(', '),
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    const { error } = await supabase.from('productostab').delete().eq('id', selectedDeleteId);
    if (error) toast.error('Error eliminando producto');
    else {
      toast.success('Producto eliminado');
      fetchProducts();
    }
    setDeleteDialogOpen(false);
    setSelectedDeleteId(null);
  };

  const toggleField = async (id: number, field: 'isActive' | 'isFavorite', current: boolean) => {
    const { error } = await supabase.from('productostab').update({ [field]: !current }).eq('id', id);
    if (error) toast.error('Error actualizando');
    else {
      toast.success('Actualizado');
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Productos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProduct(null); setForm({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' }); }}>Agregar Producto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle></DialogHeader>
            <ProductForm form={form} setForm={setForm} categories={categories} editingProduct={editingProduct} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <ProductSearchBar search={search} setSearch={setSearch} />

      <ProductTable
        products={filteredProducts}
        categoryMap={categoryMap}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={(id, curr) => toggleField(id, 'isActive', curr)}
        onToggleFavorite={(id, curr) => toggleField(id, 'isFavorite', curr)}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
