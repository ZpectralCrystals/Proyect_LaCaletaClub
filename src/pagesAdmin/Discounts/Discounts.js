'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DescuentosAdmin;
var react_1 = require("react");
var supabaseClient_1 = require("../../lib/supabaseClient");
var dialog_1 = require("../../components/ui/dialog");
var alert_dialog_1 = require("../../components/ui/alert-dialog");
var button_1 = require("../../components/ui/button");
var input_1 = require("../../components/ui/input");
var select_1 = require("../../components/ui/select");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var alert_1 = require("../../components/ui/alert");
function DescuentosAdmin() {
    var _this = this;
    var _a = (0, react_1.useState)([]), descuentos = _a[0], setDescuentos = _a[1];
    var _b = (0, react_1.useState)([]), types = _b[0], setTypes = _b[1];
    var _c = (0, react_1.useState)([]), dias = _c[0], setDias = _c[1];
    var _d = (0, react_1.useState)([]), productos = _d[0], setProductos = _d[1];
    var _e = (0, react_1.useState)([]), categorias = _e[0], setCategorias = _e[1];
    var _f = (0, react_1.useState)({
        name: '',
        descuento: '',
        imagen: '',
        type: '',
        id_dia: '',
        id_producto: '',
        id_category: '',
    }), form = _f[0], setForm = _f[1];
    var _g = (0, react_1.useState)(null), editingDescuento = _g[0], setEditingDescuento = _g[1];
    var _h = (0, react_1.useState)(false), open = _h[0], setOpen = _h[1];
    var _j = (0, react_1.useState)(false), deleteDialogOpen = _j[0], setDeleteDialogOpen = _j[1];
    var _k = (0, react_1.useState)(null), selectedDeleteId = _k[0], setSelectedDeleteId = _k[1];
    var _l = (0, react_1.useState)(null), alertMessage = _l[0], setAlertMessage = _l[1];
    var _m = (0, react_1.useState)(null), alertType = _m[0], setAlertType = _m[1];
    var showAlert = function (type, message) {
        setAlertType(type);
        setAlertMessage(message);
    };
    (0, react_1.useEffect)(function () {
        if (alertMessage) {
            var timer_1 = setTimeout(function () {
                setAlertMessage(null);
                setAlertType(null);
            }, 4000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [alertMessage]);
    // Fetch all data needed
    var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, descData, descError, _b, typeData, typeError, _c, diasData, diasError, _d, productosData, productosError, _e, categoriasData, categoriasError;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.from('descuentostab').select('*')];
                case 1:
                    _a = _f.sent(), descData = _a.data, descError = _a.error;
                    return [4 /*yield*/, supabaseClient_1.supabase.from('typetab').select('*')];
                case 2:
                    _b = _f.sent(), typeData = _b.data, typeError = _b.error;
                    return [4 /*yield*/, supabaseClient_1.supabase.from('diassemanatab').select('*')];
                case 3:
                    _c = _f.sent(), diasData = _c.data, diasError = _c.error;
                    return [4 /*yield*/, supabaseClient_1.supabase.from('productostab').select('*')];
                case 4:
                    _d = _f.sent(), productosData = _d.data, productosError = _d.error;
                    return [4 /*yield*/, supabaseClient_1.supabase.from('categoriatab').select('*')];
                case 5:
                    _e = _f.sent(), categoriasData = _e.data, categoriasError = _e.error;
                    if (descError) {
                        console.error(descError);
                        showAlert('error', 'Error cargando descuentos');
                    }
                    else {
                        setDescuentos(descData || []);
                    }
                    if (typeError) {
                        console.error(typeError);
                        showAlert('error', 'Error cargando tipos');
                    }
                    else {
                        setTypes(typeData || []);
                    }
                    if (diasError) {
                        console.error(diasError);
                        showAlert('error', 'Error cargando días');
                    }
                    else {
                        setDias(diasData || []);
                    }
                    if (productosError) {
                        console.error(productosError);
                        showAlert('error', 'Error cargando productos');
                    }
                    else {
                        setProductos(productosData || []);
                    }
                    if (categoriasError) {
                        console.error(categoriasError);
                        showAlert('error', 'Error cargando categorías');
                    }
                    else {
                        setCategorias(categoriasData || []);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchData();
    }, []);
    var handleChange = function (e) {
        var _a;
        setForm(__assign(__assign({}, form), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    // Para Select con shadcn/ui
    var handleSelectChange = function (name, value) {
        setForm(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var typeNum, payload, error, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Validaciones básicas
                    if (!form.name.trim()) {
                        showAlert('error', 'El nombre es obligatorio');
                        return [2 /*return*/];
                    }
                    if (!form.descuento || isNaN(Number(form.descuento))) {
                        showAlert('error', 'El descuento debe ser un número válido');
                        return [2 /*return*/];
                    }
                    if (!form.imagen.trim()) {
                        showAlert('error', 'La imagen es obligatoria');
                        return [2 /*return*/];
                    }
                    if (!form.type) {
                        showAlert('error', 'Debe seleccionar un tipo');
                        return [2 /*return*/];
                    }
                    typeNum = Number(form.type);
                    if (typeNum === 1) {
                        if (!form.id_dia) {
                            showAlert('error', 'Debe seleccionar un día');
                            return [2 /*return*/];
                        }
                    }
                    else if (typeNum === 2) {
                        if ((!form.id_producto || form.id_producto === '') && (!form.id_category || form.id_category === '')) {
                            showAlert('error', 'Debe seleccionar un producto o una categoría');
                            return [2 /*return*/];
                        }
                        if (form.id_producto && form.id_category && form.id_producto !== '' && form.id_category !== '') {
                            showAlert('error', 'Debe seleccionar solo un producto o una categoría, no ambos');
                            return [2 /*return*/];
                        }
                    }
                    else {
                        showAlert('error', 'Tipo inválido');
                        return [2 /*return*/];
                    }
                    payload = {
                        name: form.name.trim(),
                        descuento: Number(form.descuento),
                        imagen: form.imagen.trim(),
                        type: typeNum,
                        id_dia: typeNum === 1 ? Number(form.id_dia) : null,
                        id_producto: typeNum === 2 && form.id_producto !== '' ? Number(form.id_producto) : null,
                        id_category: typeNum === 2 && form.id_category !== '' ? Number(form.id_category) : null,
                    };
                    if (!editingDescuento) return [3 /*break*/, 2];
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('descuentostab')
                            .update(payload)
                            .eq('id', editingDescuento.id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        showAlert('error', 'Error actualizando descuento');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Descuento actualizado');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabaseClient_1.supabase.from('descuentostab').insert([payload])];
                case 3:
                    error = (_a.sent()).error;
                    if (error) {
                        showAlert('error', 'Error agregando descuento');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Descuento agregado');
                    _a.label = 4;
                case 4:
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
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (desc) {
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
    var openDeleteDialog = function (id) {
        setSelectedDeleteId(id);
        setDeleteDialogOpen(true);
    };
    var confirmDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedDeleteId)
                        return [2 /*return*/];
                    return [4 /*yield*/, supabaseClient_1.supabase.from('descuentostab').delete().eq('id', selectedDeleteId)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        showAlert('error', 'Error eliminando descuento');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Descuento eliminado');
                    setSelectedDeleteId(null);
                    setDeleteDialogOpen(false);
                    fetchData();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="p-6">
            {alertMessage && (<alert_1.Alert variant={alertType === 'error' ? 'destructive' : 'default'} className="shadow-lg">
                    <alert_1.AlertTitle>{alertType === 'error' ? 'Error' : 'Éxito'}</alert_1.AlertTitle>
                    <alert_1.AlertDescription>{alertMessage}</alert_1.AlertDescription>
                </alert_1.Alert>)}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Descuentos</h1>
                <dialog_1.Dialog open={open} onOpenChange={setOpen}>
                    <dialog_1.DialogTrigger asChild>
                        <button_1.Button onClick={function () {
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
        }}>
                            Agregar Descuento
                        </button_1.Button>
                    </dialog_1.DialogTrigger>
                    <dialog_1.DialogContent>
                        <dialog_1.DialogHeader>
                            <dialog_1.DialogTitle>{editingDescuento ? 'Editar Descuento' : 'Nuevo Descuento'}</dialog_1.DialogTitle>
                        </dialog_1.DialogHeader>
                        <div className="space-y-4">
                            <input_1.Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange}/>
                            <input_1.Input name="descuento" type="number" placeholder="Descuento (%)" value={form.descuento} onChange={handleChange}/>
                            <input_1.Input name="imagen" placeholder="URL Imagen" value={form.imagen} onChange={handleChange}/>

                            {/* Select Type */}
                            <select_1.Select name="type" onValueChange={function (value) { return handleSelectChange('type', value); }} value={form.type}>
                                <select_1.SelectTrigger className="w-[200px]">
                                    <select_1.SelectValue placeholder="Selecciona Tipo"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    <select_1.SelectGroup>
                                        <select_1.SelectLabel>Tipo</select_1.SelectLabel>
                                        {types.map(function (t) { return (<select_1.SelectItem key={t.id} value={t.id.toString()}>
                                                {t.descripcion}
                                            </select_1.SelectItem>); })}
                                    </select_1.SelectGroup>
                                </select_1.SelectContent>
                            </select_1.Select>

                            {/* Según tipo: */}
                            {form.type === '1' && (<select_1.Select name="id_dia" onValueChange={function (value) { return handleSelectChange('id_dia', value); }} value={form.id_dia}>
                                    <select_1.SelectTrigger className="w-[200px] mt-2">
                                        <select_1.SelectValue placeholder="Selecciona Día"/>
                                    </select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                        <select_1.SelectGroup>
                                            <select_1.SelectLabel>Días</select_1.SelectLabel>
                                            {dias.map(function (dia) { return (<select_1.SelectItem key={dia.id} value={dia.id.toString()}>
                                                    {dia.dia}
                                                </select_1.SelectItem>); })}
                                        </select_1.SelectGroup>
                                    </select_1.SelectContent>
                                </select_1.Select>)}

                            {form.type === '2' && (<>
                                    <select_1.Select name="id_producto" onValueChange={function (value) {
                handleSelectChange('id_producto', value);
                setForm(function (prev) { return (__assign(__assign({}, prev), { id_category: '' })); });
            }} value={form.id_producto}>
                                        <select_1.SelectTrigger className="w-[200px] mt-2">
                                            <select_1.SelectValue placeholder="Selecciona Producto"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                            <select_1.SelectGroup>
                                                <select_1.SelectLabel>Productos</select_1.SelectLabel>
                                                {productos.map(function (prod) { return (<select_1.SelectItem key={prod.id} value={prod.id.toString()}>
                                                        {prod.name}
                                                    </select_1.SelectItem>); })}
                                            </select_1.SelectGroup>
                                        </select_1.SelectContent>
                                    </select_1.Select>

                                    <select_1.Select name="id_category" onValueChange={function (value) {
                handleSelectChange('id_category', value);
                // Vaciar producto si se selecciona categoría
                setForm(function (prev) { return (__assign(__assign({}, prev), { id_producto: '' })); });
            }} value={form.id_category}>
                                        <select_1.SelectTrigger className="w-[200px] mt-2">
                                            <select_1.SelectValue placeholder="Selecciona Categoría"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                            <select_1.SelectGroup>
                                                <select_1.SelectLabel>Categorías</select_1.SelectLabel>
                                                {categorias.map(function (cat) { return (<select_1.SelectItem key={cat.id} value={cat.id.toString()}>
                                                        {cat.descripcion}
                                                    </select_1.SelectItem>); })}
                                            </select_1.SelectGroup>
                                        </select_1.SelectContent>
                                    </select_1.Select>
                                </>)}

                            <button_1.Button onClick={handleSubmit} className="mt-4">
                                {editingDescuento ? 'Actualizar' : 'Agregar'}
                            </button_1.Button>
                        </div>
                    </dialog_1.DialogContent>
                </dialog_1.Dialog>
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
                    <tbody> {descuentos.map(function (desc) {
            var _a, _b, _c, _d;
            return (<tr key={desc.id} className="odd:bg-white even:bg-gray-50">
                            <td className="border px-4 py-2">{desc.id}
                            </td>
                            <td className="border px-4 py-2">{desc.name}
                            </td>
                            <td className="border px-4 py-2">{desc.descuento}%
                            </td>
                            <td className="border px-4 py-2"> {desc.imagen ? (<img src={desc.imagen} alt={desc.name} className="h-10 w-10 object-cover"/>) : ('N/A')}
                            </td>
                            <td className="border px-4 py-2"> {((_a = types.find(function (t) { return t.id === desc.type; })) === null || _a === void 0 ? void 0 : _a.descripcion) || 'N/A'}
                            </td>
                            <td className="border px-4 py-2"> {desc.id_dia ? (_b = dias.find(function (d) { return d.id === desc.id_dia; })) === null || _b === void 0 ? void 0 : _b.dia : 'N/A'}
                            </td>
                            <td className="border px-4 py-2"> {desc.id_producto ? (_c = productos.find(function (p) { return p.id === desc.id_producto; })) === null || _c === void 0 ? void 0 : _c.name : 'N/A'}
                            </td>
                            <td className="border px-4 py-2"> {desc.id_category ? (_d = categorias.find(function (c) { return c.id === desc.id_category; })) === null || _d === void 0 ? void 0 : _d.descripcion : 'N/A'}
                            </td>
                            <td className="border px-4 py-2 flex gap-2 justify-center">
                                <button_1.Button variant="outline" size="sm" onClick={function () { return handleEdit(desc); }} title="Editar"> <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPen}/> </button_1.Button>
                                <alert_dialog_1.AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                    <alert_dialog_1.AlertDialogTrigger asChild>
                                        <button_1.Button variant="outline" size="sm" onClick={function () { return openDeleteDialog(desc.id); }} title="Eliminar">
                                            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTrash}/>
                                        </button_1.Button>
                                    </alert_dialog_1.AlertDialogTrigger>
                                    <alert_dialog_1.AlertDialogContent>
                                        <alert_dialog_1.AlertDialogHeader>
                                            <alert_dialog_1.AlertDialogTitle>¿Estás seguro?</alert_dialog_1.AlertDialogTitle>
                                        </alert_dialog_1.AlertDialogHeader>
                                        <alert_dialog_1.AlertDialogFooter>
                                            <alert_dialog_1.AlertDialogCancel>Cancelar</alert_dialog_1.AlertDialogCancel>
                                            <alert_dialog_1.AlertDialogAction onClick={confirmDelete}>Eliminar</alert_dialog_1.AlertDialogAction>
                                        </alert_dialog_1.AlertDialogFooter>
                                    </alert_dialog_1.AlertDialogContent>
                                </alert_dialog_1.AlertDialog>
                            </td>
                        </tr>);
        })}
                    </tbody>
                </table>
            </div>
        </div>);
}
