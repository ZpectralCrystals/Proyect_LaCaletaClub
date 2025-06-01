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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { faPen, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toaster, toast } from 'sonner';

interface Descuento {
    id: number;
    name: string;
    id_producto: number | null;
    descuento: number;
    id_dia: number | null;
    id_category: number | null;
    imagen: string;
    type: number;
    isActive: boolean;
}

interface Type {
    id: number;
    descripcion: string;
}

interface Dia {
    id: number;
    dia: string;
}

interface Producto {
    id: number;
    name: string;
}

interface Categoria {
    id: number;
    descripcion: string;
}

export default function DescuentosAdmin() {
    const [descuentos, setDescuentos] = useState<Descuento[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [dias, setDias] = useState<Dia[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

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
    if (type === 'error') toast.error(message);
    else toast.success(message);
};


    // Fetch all data needed
    const fetchData = async () => {
        const { data: descData, error: descError } = await supabase.from('descuentostab').select('*');
        const { data: typeData, error: typeError } = await supabase.from('typetab').select('*');
        const { data: diasData, error: diasError } = await supabase.from('diassemanatab').select('*');
        const { data: productosData, error: productosError } = await supabase.from('productostab').select('*');
        const { data: categoriasData, error: categoriasError } = await supabase.from('categoriatab').select('*');

        if (descError) {
            console.error(descError);
            showAlert('error', 'Error cargando descuentos');
        } else {
            setDescuentos(descData || []);
        }
        if (typeError) {
            console.error(typeError);
            showAlert('error', 'Error cargando tipos');
        } else {
            setTypes(typeData || []);
        }
        if (diasError) {
            console.error(diasError);
            showAlert('error', 'Error cargando días');
        } else {
            setDias(diasData || []);
        }
        if (productosError) {
            console.error(productosError);
            showAlert('error', 'Error cargando productos');
        } else {
            setProductos(productosData || []);
        }
        if (categoriasError) {
            console.error(categoriasError);
            showAlert('error', 'Error cargando categorías');
        } else {
            setCategorias(categoriasData || []);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Validaciones básicas
        if (!form.name.trim()) {
            showAlert('error', 'El nombre es obligatorio');
            return;
        }
        if (!form.descuento || isNaN(Number(form.descuento))) {
            showAlert('error', 'El descuento debe ser un número válido');
            return;
        }
        if (!form.imagen.trim()) {
            showAlert('error', 'La imagen es obligatoria');
            return;
        }
        if (!form.type) {
            showAlert('error', 'Debe seleccionar un tipo');
            return;
        }

        const typeNum = Number(form.type);

        if (typeNum === 1) {
            if (!form.id_dia) {
                showAlert('error', 'Debe seleccionar un día');
                return;
            }
        } else if (typeNum === 2) {
            if ((!form.id_producto || form.id_producto === '') && (!form.id_category || form.id_category === '')) {
                showAlert('error', 'Debe seleccionar un producto o una categoría');
                return;
            }
            if (form.id_producto && form.id_category && form.id_producto !== '' && form.id_category !== '') {
                showAlert('error', 'Debe seleccionar solo un producto o una categoría, no ambos');
                return;
            }
        } else {
            showAlert('error', 'Tipo inválido');
            return;
        }

        const payload = {
            name: form.name.trim(),
            descuento: Number(form.descuento),
            imagen: form.imagen.trim(),
            type: typeNum,
            id_dia: typeNum === 1 ? Number(form.id_dia) : null,
            id_producto: typeNum === 2 && form.id_producto !== '' ? Number(form.id_producto) : null,
            id_category: typeNum === 2 && form.id_category !== '' ? Number(form.id_category) : null,
            isActive: form.isActive === 'true',
        };

        try {
            if (editingDescuento) {
                const { error } = await supabase
                    .from('descuentostab')
                    .update(payload)
                    .eq('id', editingDescuento.id);

                if (error) throw error;
                showAlert('success', 'Descuento actualizado');
            } else {
                const { error } = await supabase.from('descuentostab').insert([payload]);
                if (error) throw error;
                showAlert('success', 'Descuento agregado');
            }

            setOpen(false);
            setForm({
                name: '',
                descuento: '',
                imagen: '',
                type: '',
                id_dia: '',
                id_producto: '',
                id_category: '',
                isActive: 'true',
            });
            setEditingDescuento(null);
            fetchData();
        } catch (error) {
            console.error('Error:', error);
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
            id_dia: desc.id_dia ? desc.id_dia.toString() : '',
            id_producto: desc.id_producto ? desc.id_producto.toString() : '',
            id_category: desc.id_category ? desc.id_category.toString() : '',
            isActive: desc.isActive.toString(),
        });
        setOpen(true);
    };

    const openDeleteDialog = (id: number) => {
        setSelectedDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const toggleActive = async (id: number, currentState: boolean) => {
        try {
            const { error } = await supabase
                .from('descuentostab')
                .update({ isActive: !currentState })
                .eq('id', id);
            
            if (error) throw error;
            showAlert('success', `Descuento ${!currentState ? 'activado' : 'desactivado'}`);
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            showAlert('error', 'Error cambiando estado');
        }
    };

    const confirmDelete = async () => {
        if (!selectedDeleteId) return;
        try {
            const { error } = await supabase.from('descuentostab').delete().eq('id', selectedDeleteId);
            if (error) throw error;
            showAlert('success', 'Descuento eliminado');
            setSelectedDeleteId(null);
            setDeleteDialogOpen(false);
            fetchData();
        } catch (error) {
            showAlert('error', 'Error eliminando descuento');
        }
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
                                setForm({
                                    name: '',
                                    descuento: '',
                                    imagen: '',
                                    type: '',
                                    id_dia: '',
                                    id_producto: '',
                                    id_category: '',
                                    isActive: 'true',
                                });
                            }}
                        >
                            Agregar Descuento
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingDescuento ? 'Editar Descuento' : 'Nuevo Descuento'}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                name="name"
                                placeholder="Nombre"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Input
                                name="descuento"
                                type="number"
                                placeholder="Descuento (%)"
                                value={form.descuento}
                                onChange={handleChange}
                            />
                            <Input
                                name="imagen"
                                placeholder="URL Imagen"
                                value={form.imagen}
                                onChange={handleChange}
                            />

                            <Select
                                name="isActive"
                                onValueChange={(value) => handleSelectChange('isActive', value)}
                                value={form.isActive}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Estado</SelectLabel>
                                        <SelectItem value="true">Activo</SelectItem>
                                        <SelectItem value="false">Inactivo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                name="type"
                                onValueChange={(value) => handleSelectChange('type', value)}
                                value={form.type}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Selecciona Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tipo</SelectLabel>
                                        {types.map((t) => (
                                            <SelectItem key={t.id} value={t.id.toString()}>
                                                {t.descripcion}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {form.type === '1' && (
                                <Select
                                    name="id_dia"
                                    onValueChange={(value) => handleSelectChange('id_dia', value)}
                                    value={form.id_dia}
                                >
                                    <SelectTrigger className="w-[200px] mt-2">
                                        <SelectValue placeholder="Selecciona Día" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Días</SelectLabel>
                                            {dias.map((dia) => (
                                                <SelectItem key={dia.id} value={dia.id.toString()}>
                                                    {dia.dia}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}

                            {form.type === '2' && (
                                <>
                                    <Select
                                        name="id_producto"
                                        onValueChange={(value) => {
                                            handleSelectChange('id_producto', value);
                                            setForm((prev) => ({ ...prev, id_category: '' }));
                                        }}
                                        value={form.id_producto}
                                    >
                                        <SelectTrigger className="w-[200px] mt-2">
                                            <SelectValue placeholder="Selecciona Producto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Productos</SelectLabel>
                                                {productos.map((prod) => (
                                                    <SelectItem key={prod.id} value={prod.id.toString()}>
                                                        {prod.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        name="id_category"
                                        onValueChange={(value) => {
                                            handleSelectChange('id_category', value);
                                            setForm((prev) => ({ ...prev, id_producto: '' }));
                                        }}
                                        value={form.id_category}
                                    >
                                        <SelectTrigger className="w-[200px] mt-2">
                                            <SelectValue placeholder="Selecciona Categoría" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categorías</SelectLabel>
                                                {categorias.map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                                        {cat.descripcion}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </>
                            )}
                            <div className="flex justify-end">
                                <Button onClick={handleSubmit}>
                                    {editingDescuento ? 'Actualizar' : 'Guardar'}
                                </Button>
                            </div>
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
                        {descuentos.map((d) => {
                            const tipo = types.find((t) => t.id === d.type)?.descripcion || '';
                            const producto = productos.find((p) => p.id === d.id_producto)?.name;
                            const categoria = categorias.find((c) => c.id === d.id_category)?.descripcion;
                            const dia = dias.find((dd) => dd.id === d.id_dia)?.dia;

                            return (
                                <tr key={d.id} className="border-t">
                                    <td className="p-2">{d.name}</td>
                                    <td className="p-2">{d.descuento}%</td>
                                    <td className="p-2">
                                        <img src={d.imagen} alt="Imagen" className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="p-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            d.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {d.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="p-2">{tipo}</td>
                                    <td className="p-2">
                                        {producto || categoria || '—'}
                                    </td>
                                    <td className="p-2">{dia || '—'}</td>
                                    <td className="p-2 flex justify-center gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEdit(d)}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => toggleActive(d.id, d.isActive)}
                                        >
                                            <FontAwesomeIcon icon={d.isActive ? faEyeSlash : faEye} />
                                        </Button>
                                        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => openDeleteDialog(d.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        ¿Estás seguro de eliminar este descuento?
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={confirmDelete}>
                                                        Eliminar
                                                    </AlertDialogAction>
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