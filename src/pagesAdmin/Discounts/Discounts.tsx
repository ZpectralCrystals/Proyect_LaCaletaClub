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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';

interface Descuento {
    id: number;
    name: string;
    id_producto: number | null;
    descuento: number;
    id_dia: number | null;
    id_category: number | null;
    imagen: string;
    type: number;
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
    });

    const [editingDescuento, setEditingDescuento] = useState<Descuento | null>(null);
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

    // Para Select con shadcn/ui
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

        
        const payload: Partial<Descuento> = {
            name: form.name.trim(),
            descuento: Number(form.descuento),
            imagen: form.imagen.trim(),
            type: typeNum,
            id_dia: typeNum === 1 ? Number(form.id_dia) : null,
            id_producto: typeNum === 2 && form.id_producto !== '' ? Number(form.id_producto) : null,
            id_category: typeNum === 2 && form.id_category !== '' ? Number(form.id_category) : null,
        };

        if (editingDescuento) {
            const { error } = await supabase
                .from('descuentostab')
                .update(payload)
                .eq('id', editingDescuento.id);
            if (error) {
                showAlert('error', 'Error actualizando descuento');
                return;
            }
            showAlert('success', 'Descuento actualizado');
        } else {
            const { error } = await supabase.from('descuentostab').insert([payload]);
            if (error) {
                showAlert('error', 'Error agregando descuento');
                return;
            }
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
        });
        setEditingDescuento(null);
        fetchData();
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
        });
        setOpen(true);
    };

    const openDeleteDialog = (id: number) => {
        setSelectedDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedDeleteId) return;
        const { error } = await supabase.from('descuentostab').delete().eq('id', selectedDeleteId);
        if (error) {
            showAlert('error', 'Error eliminando descuento');
            return;
        }
        showAlert('success', 'Descuento eliminado');
        setSelectedDeleteId(null);
        setDeleteDialogOpen(false);
        fetchData();
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

                            {/* Select Type */}
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

                            {/* Según tipo: */}
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
                                            // Vaciar producto si se selecciona categoría
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

                            <Button onClick={handleSubmit} className="mt-4">
                                {editingDescuento ? 'Actualizar' : 'Agregar'}
                            </Button>
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
                            <th className="border px-4 py-2">Descuento</th>
                            <th className="border px-4 py-2">Imagen</th>
                            <th className="border px-4 py-2">Tipo</th>
                            <th className="border px-4 py-2">Día</th>
                            <th className="border px-4 py-2">Producto</th>
                            <th className="border px-4 py-2">Categoría</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>

                    </thead>
                    <tbody> {descuentos.map((desc) => (
                        <tr key={desc.id} className="odd:bg-white even:bg-gray-50">
                            <td className="border px-4 py-2">{desc.id}
                            </td>
                            <td className="border px-4 py-2">{desc.name}
                            </td>
                            <td className="border px-4 py-2">{desc.descuento}%
                            </td>
                            <td className="border px-4 py-2"> {desc.imagen ? (<img src={desc.imagen} alt={desc.name} className="h-10 w-10 object-cover" />) : ('N/A')}
                            </td>
                            <td className="border px-4 py-2"> {types.find((t) => t.id === desc.type)?.descripcion || 'N/A'}
                            </td>
                            <td className="border px-4 py-2"> {desc.id_dia ? dias.find((d) => d.id === desc.id_dia)?.dia : 'N/A'}
                            </td>
                            <td className="border px-4 py-2"> {desc.id_producto ? productos.find((p) => p.id === desc.id_producto)?.name : 'N/A'}
                            </td>
                            <td className="border px-4 py-2"> {desc.id_category ? categorias.find((c) => c.id === desc.id_category)?.descripcion : 'N/A'}
                            </td>
                            <td className="border px-4 py-2 flex gap-2 justify-center">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(desc)} title="Editar" > <FontAwesomeIcon icon={faPen} /> </Button>
                                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openDeleteDialog(desc.id)}
                                            title="Eliminar"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
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