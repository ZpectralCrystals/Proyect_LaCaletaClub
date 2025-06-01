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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  faPen,
  faTrash,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Toaster, toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  description: string;
  image: string;
  varietyOptions: string[];
  isActive: boolean;
  isFavorite:boolean;
}

interface Category {
  id: number;
  descripcion: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
    varietyOptions: '',
  });

  
  const showAlert = (type: 'error' | 'success', message: string) => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('productostab').select('*');
    if (error) {
      console.error(error);
      showAlert('error', 'Error cargando productos');
    } else setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categoriatab')
      .select('id, descripcion');
    if (error) {
      console.error('Error al cargar categorías:', error);
      showAlert('error', 'Error cargando categorías');
    } else {
      setCategories(data || []);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const parsedPrice = parseFloat(form.price);
    const parsedType = parseInt(form.type);

    if (!form.name || isNaN(parsedType) || isNaN(parsedPrice) || !form.image) {
      showAlert('error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const varietyArray = form.varietyOptions
      ? form.varietyOptions.split(',').map((opt) => opt.trim())
      : [];

    if (editingProduct) {
      const { error } = await supabase
        .from('productostab')
        .update({
          name: form.name,
          type: parsedType,
          price: parsedPrice,
          description: form.description,
          image: form.image,
          varietyOptions: varietyArray,
        })
        .eq('id', editingProduct.id);

      if (error) {
        console.error('Error actualizando producto:', error);
        showAlert('error', 'Error actualizando producto');
        return;
      }
      showAlert('success', 'Producto actualizado con éxito');
    } else {
      const { error } = await supabase.from('productostab').insert([
        {
          name: form.name,
          type: parsedType,
          price: parsedPrice,
          description: form.description,
          image: form.image,
          varietyOptions: varietyArray,
          isActive: true,
        },
      ]);

      if (error) {
        console.error('Error agregando producto:', error);
        showAlert('error', 'Error agregando producto');
        return;
      }
      showAlert('success', 'Producto agregado con éxito');
    }

    setOpen(false);
    setForm({
      name: '',
      type: '',
      price: '',
      description: '',
      image: '',
      varietyOptions: '',
    });
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
      varietyOptions: product.varietyOptions ? product.varietyOptions.join(', ') : '',
    });
    setOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    const { error } = await supabase
      .from('productostab')
      .delete()
      .eq('id', selectedDeleteId);
    if (error) {
      console.error('Error eliminando producto:', error);
      showAlert('error', 'Error eliminando producto');
      return;
    }
    showAlert('success', 'Producto eliminado con éxito');
    setSelectedDeleteId(null);
    setDeleteDialogOpen(false);
    fetchProducts();
  };

  const toggleActive = async (id: number, current: boolean) => {
    const { error } = await supabase
      .from('productostab')
      .update({ isActive: !current })
      .eq('id', id);
    if (error) {
      console.error('Error actualizando estado activo:', error);
      showAlert('error', 'Error actualizando estado del producto');
      return;
    }

    showAlert('success', `Producto ${!current ? 'activado' : 'desactivado'} con éxito`);
    fetchProducts();
  };
const toggleFavorite = async (id: number, current: boolean) => {
  const { error } = await supabase
    .from('productostab')
    .update({ isFavorite: !current })
    .eq('id', id);

  if (error) {
    console.error('Error actualizando favorito:', error);
    showAlert('error', 'Error actualizando favorito');
    return;
  }

  showAlert('success', `Producto ${!current ? 'marcado como favorito' : 'removido de favoritos'} con éxito`);
  fetchProducts();
};

  const getCategoryName = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    return category?.descripcion || 'Sin categoría';
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Productos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setForm({
                  name: '',
                  type: '',
                  price: '',
                  description: '',
                  image: '',
                  varietyOptions: '',
                });
              }}
            >
              Agregar Producto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
              <Select
                value={form.type}
                onValueChange={(value) => setForm({ ...form, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.descripcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                name="price"
                placeholder="Precio"
                type="number"
                value={form.price}
                onChange={handleChange}
                step="0.01"
              />
              <Input
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
              />
              <Input
                name="image"
                placeholder="URL Imagen"
                value={form.image}
                onChange={handleChange}
              />
              <Input
                name="varietyOptions"
                placeholder="Opciones de Variedad (separadas por coma)"
                value={form.varietyOptions}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}>{editingProduct ? 'Actualizar' : 'Agregar'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Categoría</th>
              <th className="border px-4 py-2">Precio</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Imagen</th>
              <th className="border px-4 py-2">Variedades</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Favorito</th>

              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{getCategoryName(product.type)}</td>
                <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />
                  )}
                </td>
                <td className="border px-4 py-2">
                  {product.varietyOptions?.join(', ')}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => toggleActive(product.id, product.isActive)}
                    title={product.isActive ? 'Desactivar' : 'Activar'}
                  >
                    <FontAwesomeIcon
                      icon={product.isActive ? faToggleOn : faToggleOff}
                      className={`text-xl ${product.isActive ? 'text-green-500' : 'text-gray-400'}`}
                    />
                  </Button>
                </td>
                <td className="border px-4 py-2 text-center">
  <Button
    variant="ghost"
    onClick={() => toggleFavorite(product.id, product.isFavorite)}
    title={product.isFavorite ? 'Quitar de Favoritos' : 'Marcar como Favorito'}
  >
    <FontAwesomeIcon
      icon={product.isFavorite ? faToggleOn : faToggleOff}
      className={`text-xl ${product.isFavorite ? 'text-green-500' : 'text-gray-400'}`}
    />
  </Button>
</td>

                <td className="border px-4 py-2 space-x-2 text-center">
                  <Button variant="ghost" onClick={() => handleEdit(product)} title="Editar">
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => openDeleteDialog(product.id)}
                        title="Eliminar"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ¿Estás seguro que quieres eliminar este producto?
                        </AlertDialogTitle>
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
