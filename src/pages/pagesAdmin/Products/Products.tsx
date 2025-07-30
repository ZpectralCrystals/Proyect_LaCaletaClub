'use client';

import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import { ProductSearchBar } from './components/ProductSearchBar';
import { useCategorias } from '@/hooks/useCategorias';
import { useProductos } from '@/hooks/useProductos';

export default function ProductsAdmin() {
  const { categorias, fetchCategorias } = useCategorias();
  const {
    productos,
    fetchProductos,
    addOrUpdateProducto,
    deleteProducto,
    toggleCampo,
  } = useProductos();

  const [form, setForm] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
    varietyOptions: '',
  });
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const categoryMap = useMemo(
    () => Object.fromEntries(categorias.map((cat) => [cat.id, cat.descripcion])),
    [categorias]
  );

  const handleSubmit = async () => {
    const parsedType = parseInt(form.type);
    const parsedPrice = parseFloat(form.price);
    const varietyArray = form.varietyOptions.split(',').map((v) => v.trim());

    if (!form.name || isNaN(parsedType) || isNaN(parsedPrice) || !form.image) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }

    await addOrUpdateProducto(
      {
        name: form.name,
        type: parsedType,
        price: parsedPrice,
        description: form.description,
        image: form.image,
        varietyOptions: varietyArray,
        isActive: true,
        isFavorite: true,
      },
      editingProduct
    );

    setOpen(false);
    setForm({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' });
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
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

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    await deleteProducto(selectedDeleteId);
    setDeleteDialogOpen(false);
    setSelectedDeleteId(null);
  };

  const filteredProducts = productos.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Productos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setForm({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' });
              }}
            >
              Agregar Producto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
            </DialogHeader>
            <ProductForm
              form={form}
              setForm={setForm}
              categories={categorias}
              editingProduct={editingProduct}
              onSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProductSearchBar search={search} setSearch={setSearch} />

      <ProductTable
        products={filteredProducts}
        categoryMap={categoryMap}
        onEdit={handleEdit}
        onDelete={(id) => {
          setSelectedDeleteId(id);
          setDeleteDialogOpen(true);
        }}
        onToggleActive={(producto) => toggleCampo(producto, 'isActive')}
  onToggleFavorite={(producto) => toggleCampo(producto, 'isFavorite')}
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
