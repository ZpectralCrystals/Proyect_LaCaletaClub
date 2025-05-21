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
exports.default = CategoriasAdmin;
var react_1 = require("react");
var supabaseClient_1 = require("../../lib/supabaseClient");
var dialog_1 = require("../../components/ui/dialog");
var alert_dialog_1 = require("../../components/ui/alert-dialog");
var button_1 = require("../../components/ui/button");
var input_1 = require("../../components/ui/input");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var alert_1 = require("../../components/ui/alert");
function CategoriasAdmin() {
    var _this = this;
    var _a = (0, react_1.useState)([]), categorias = _a[0], setCategorias = _a[1];
    var _b = (0, react_1.useState)({ descripcion: '' }), form = _b[0], setForm = _b[1];
    var _c = (0, react_1.useState)(null), editingCategoria = _c[0], setEditingCategoria = _c[1];
    var _d = (0, react_1.useState)(false), open = _d[0], setOpen = _d[1];
    var _e = (0, react_1.useState)(false), deleteDialogOpen = _e[0], setDeleteDialogOpen = _e[1];
    var _f = (0, react_1.useState)(null), selectedDeleteId = _f[0], setSelectedDeleteId = _f[1];
    var _g = (0, react_1.useState)(null), alertMessage = _g[0], setAlertMessage = _g[1];
    var _h = (0, react_1.useState)(null), alertType = _h[0], setAlertType = _h[1];
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
    var fetchCategorias = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.from('categoriatab').select('*')];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error(error);
                        showAlert('error', 'Error cargando categorías');
                    }
                    else {
                        setCategorias(data || []);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchCategorias();
    }, []);
    var handleChange = function (e) {
        var _a;
        setForm(__assign(__assign({}, form), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var error, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!form.descripcion.trim()) {
                        showAlert('error', 'La descripción es obligatoria');
                        return [2 /*return*/];
                    }
                    if (!editingCategoria) return [3 /*break*/, 2];
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('categoriatab')
                            .update({ descripcion: form.descripcion })
                            .eq('id', editingCategoria.id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        showAlert('error', 'Error actualizando categoría');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Categoría actualizada');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabaseClient_1.supabase.from('categoriatab').insert([{ descripcion: form.descripcion }])];
                case 3:
                    error = (_a.sent()).error;
                    if (error) {
                        showAlert('error', 'Error agregando categoría');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Categoría agregada');
                    _a.label = 4;
                case 4:
                    setOpen(false);
                    setForm({ descripcion: '' });
                    setEditingCategoria(null);
                    fetchCategorias();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (categoria) {
        setEditingCategoria(categoria);
        setForm({ descripcion: categoria.descripcion });
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
                    return [4 /*yield*/, supabaseClient_1.supabase.from('categoriatab').delete().eq('id', selectedDeleteId)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        showAlert('error', 'Error eliminando categoría');
                        return [2 /*return*/];
                    }
                    showAlert('success', 'Categoría eliminada');
                    setSelectedDeleteId(null);
                    setDeleteDialogOpen(false);
                    fetchCategorias();
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
        <h1 className="text-xl font-bold">Categorías</h1>
        <dialog_1.Dialog open={open} onOpenChange={setOpen}>
          <dialog_1.DialogTrigger asChild>
            <button_1.Button onClick={function () {
            setEditingCategoria(null);
            setForm({ descripcion: '' });
        }}>
              Agregar Categoría
            </button_1.Button>
          </dialog_1.DialogTrigger>
          <dialog_1.DialogContent>
            <dialog_1.DialogHeader>
              <dialog_1.DialogTitle>{editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}</dialog_1.DialogTitle>
            </dialog_1.DialogHeader>
            <div className="space-y-2">
              <input_1.Input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange}/>
              <button_1.Button onClick={handleSubmit}>{editingCategoria ? 'Actualizar' : 'Agregar'}</button_1.Button>
            </div>
          </dialog_1.DialogContent>
        </dialog_1.Dialog>
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
            {categorias.map(function (cat) { return (<tr key={cat.id}>
                <td className="border px-4 py-2">{cat.id}</td>
                <td className="border px-4 py-2">{cat.descripcion}</td>
                <td className="border px-4 py-2">
                  <button_1.Button variant="ghost" size="sm" onClick={function () { return handleEdit(cat); }} className="mr-2">
                    <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPen}/>
                  </button_1.Button>

                  <alert_dialog_1.AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <alert_dialog_1.AlertDialogTrigger asChild>
                      <button_1.Button variant="ghost" size="sm" onClick={function () { return openDeleteDialog(cat.id); }}>
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
              </tr>); })}
          </tbody>
        </table>
      </div>
    </div>);
}
