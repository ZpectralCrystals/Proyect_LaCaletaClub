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
exports.default = ProductsAdmin;
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
function ProductsAdmin() {
    var _this = this;
    var _a = (0, react_1.useState)([]), products = _a[0], setProducts = _a[1];
    var _b = (0, react_1.useState)([]), categories = _b[0], setCategories = _b[1];
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var _d = (0, react_1.useState)(null), editingProduct = _d[0], setEditingProduct = _d[1];
    var _e = (0, react_1.useState)(null), selectedDeleteId = _e[0], setSelectedDeleteId = _e[1];
    var _f = (0, react_1.useState)(false), deleteDialogOpen = _f[0], setDeleteDialogOpen = _f[1];
    var _g = (0, react_1.useState)({
        name: '',
        type: '',
        price: '',
        description: '',
        image: '',
        varietyOptions: '',
    }), form = _g[0], setForm = _g[1];
    var _h = (0, react_1.useState)(null), alertMessage = _h[0], setAlertMessage = _h[1];
    var _j = (0, react_1.useState)(null), alertType = _j[0], setAlertType = _j[1];
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
    var fetchProducts = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.from('productostab').select('*')];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error(error);
                        showAlert('error', 'Error cargando productos');
                    }
                    else
                        setProducts(data || []);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchCategories = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.from('categoriatab').select('id, descripcion')];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error al cargar categorías:', error);
                        showAlert('error', 'Error cargando categorías');
                    }
                    else {
                        setCategories(data || []);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchProducts();
        fetchCategories();
    }, []);
    var handleChange = function (e) {
        var _a;
        setForm(__assign(__assign({}, form), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var parsedPrice, parsedType, varietyArray, error, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedPrice = parseFloat(form.price);
                    parsedType = parseInt(form.type);
                    if (!form.name || isNaN(parsedType) || isNaN(parsedPrice) || !form.image) {
                        showAlert('error', 'Por favor completa todos los campos obligatorios');
                        return [2 /*return*/];
                    }
                    varietyArray = form.varietyOptions
                        ? form.varietyOptions.split(',').map(function (opt) { return opt.trim(); })
                        : [];
                    if (!editingProduct) return [3 /*break*/, 2];
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('productostab')
                            .update({
                            name: form.name,
                            type: parsedType,
                            price: parsedPrice,
                            description: form.description,
                            image: form.image,
                            varietyOptions: varietyArray,
                        })
                            .eq('id', editingProduct.id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error('Error actualizando producto:', error);
                        showAlert('error', 'Error actualizando producto');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Producto actualizado con éxito');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabaseClient_1.supabase
                        .from('productostab')
                        .insert([
                        {
                            name: form.name,
                            type: parsedType,
                            price: parsedPrice,
                            description: form.description,
                            image: form.image,
                            varietyOptions: varietyArray,
                        },
                    ])];
                case 3:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error('Error agregando producto:', error);
                        showAlert('error', 'Error agregando producto');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Producto agregado con éxito');
                    _a.label = 4;
                case 4:
                    setOpen(false);
                    setForm({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' });
                    setEditingProduct(null);
                    fetchProducts();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (product) {
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
                    return [4 /*yield*/, supabaseClient_1.supabase.from('productostab').delete().eq('id', selectedDeleteId)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error('Error eliminando producto:', error);
                        showAlert('error', 'Error eliminando producto');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Producto eliminado con éxito');
                    setSelectedDeleteId(null);
                    setDeleteDialogOpen(false);
                    fetchProducts();
                    return [2 /*return*/];
            }
        });
    }); };
    var getCategoryName = function (id) {
        var category = categories.find(function (cat) { return cat.id === id; });
        return (category === null || category === void 0 ? void 0 : category.descripcion) || 'Sin categoría';
    };
    return (<div className="p-6">
            {alertMessage && (<alert_1.Alert variant={alertType === 'error' ? 'destructive' : 'default'} className="shadow-lg mb-4">
                    <alert_1.AlertTitle>{alertType === 'error' ? 'Error' : 'Éxito'}</alert_1.AlertTitle>
                    <alert_1.AlertDescription>{alertMessage}</alert_1.AlertDescription>
                </alert_1.Alert>)}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Productos</h1>
                <dialog_1.Dialog open={open} onOpenChange={setOpen}>
                    <dialog_1.DialogTrigger asChild>
                        <button_1.Button onClick={function () {
            setEditingProduct(null);
            setForm({ name: '', type: '', price: '', description: '', image: '', varietyOptions: '' });
        }}>
                            Agregar Producto
                        </button_1.Button>
                    </dialog_1.DialogTrigger>
                    <dialog_1.DialogContent>
                        <dialog_1.DialogHeader>
                            <dialog_1.DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</dialog_1.DialogTitle>
                        </dialog_1.DialogHeader>
                        <div className="space-y-2">
                            <input_1.Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange}/>
                            <select_1.Select value={form.type} onValueChange={function (value) { return setForm(__assign(__assign({}, form), { type: value })); }}>
                                <select_1.SelectTrigger>
                                    <select_1.SelectValue placeholder="Selecciona una categoría"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    {categories.map(function (cat) { return (<select_1.SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.descripcion}
                                        </select_1.SelectItem>); })}
                                </select_1.SelectContent>
                            </select_1.Select>
                            <input_1.Input name="price" placeholder="Precio" type="number" value={form.price} onChange={handleChange} step="0.01"/>
                            <input_1.Input name="description" placeholder="Descripción" value={form.description} onChange={handleChange}/>
                            <input_1.Input name="image" placeholder="URL Imagen" value={form.image} onChange={handleChange}/>
                            <input_1.Input name="varietyOptions" placeholder="Opciones de Variedad (separadas por coma)" value={form.varietyOptions} onChange={handleChange}/>
                            <button_1.Button onClick={handleSubmit}>{editingProduct ? 'Actualizar' : 'Agregar'}</button_1.Button>
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
                            <th className="border px-4 py-2">Categoría</th>
                            <th className="border px-4 py-2">Precio</th>
                            <th className="border px-4 py-2">Descripción</th>
                            <th className="border px-4 py-2">Imagen</th>
                            <th className="border px-4 py-2">Opciones Variedad</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(function (product) {
            var _a;
            return (<tr key={product.id}>
                                <td className="border px-4 py-2">{product.id}</td>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{getCategoryName(product.type)}</td>
                                <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">{product.description}</td>
                                <td className="border px-4 py-2">
                                    {product.image ? (<img src={product.image} alt={product.name} className="h-12 w-12 object-cover"/>) : ('N/A')}
                                </td>
                                <td className="border px-4 py-2">{(_a = product.varietyOptions) === null || _a === void 0 ? void 0 : _a.join(', ')}</td>
                                <td className="border px-4 py-2">
                                    <button_1.Button variant="ghost" size="sm" onClick={function () { return handleEdit(product); }} className="mr-2">
                                        <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPen}/>
                                    </button_1.Button>
                                    <alert_dialog_1.AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                        <alert_dialog_1.AlertDialogTrigger asChild>
                                            <button_1.Button variant="ghost" size="sm" onClick={function () { return openDeleteDialog(product.id); }}>
                                                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTrash}/>
                                            </button_1.Button>
                                        </alert_dialog_1.AlertDialogTrigger>
                                        <alert_dialog_1.AlertDialogContent>
                                            <alert_dialog_1.AlertDialogHeader>
                                                <alert_dialog_1.AlertDialogTitle>¿Estás seguro?</alert_dialog_1.AlertDialogTitle>
                                                <p>Esta acción no se puede deshacer.</p>
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
