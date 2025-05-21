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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var sedes = {
    "Umacollo": "51913204134",
    "Lambramani": "51913204168",
    "Cerro Colorado": "51977928716",
};
var Contacto = function () {
    var _a = (0, react_1.useState)({
        nombre: "",
        telefono: "",
        mensaje: "",
        sede: "",
    }), formulario = _a[0], setFormulario = _a[1];
    var handleChange = function (e) {
        var _a;
        setFormulario(__assign(__assign({}, formulario), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var numeroWhatsApp = sedes[formulario.sede];
        var texto = "\uD83D\uDC64 Nombre: ".concat(formulario.nombre, "\n\uD83D\uDCDE Tel\u00E9fono: ").concat(formulario.telefono, "\n\uD83D\uDCCD Sede: ").concat(formulario.sede, "\n\u2709\uFE0F Mensaje: ").concat(formulario.mensaje);
        var url = "https://wa.me/".concat(numeroWhatsApp, "?text=").concat(encodeURIComponent(texto));
        window.open(url, "_blank");
    };
    return (<main className="min-h-screen bg-white py-16 px-6">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 text-center mb-10">Contáctanos</h1>

        {/* Información de sedes */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-sky-900">
          <div>
            <h3 className="font-bold">📍 Umacollo</h3>
            <p>Emmel G-4, frente al Estadio</p>
            <p>📲 913 204 134</p>
          </div>
          <div>
            <h3 className="font-bold">📍 Lambramani</h3>
            <p>Av. Lambramani B-2, a una cuadra del óvalo</p>
            <p>📲 913 204 168</p>
          </div>
          <div>
            <h3 className="font-bold">📍 Cerro Colorado</h3>
            <p>Av. Alfonso Ugarte 618-A, a dos cuadras de la Plaza Las Américas</p>
            <p>📲 977 928 716</p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-xl shadow space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="nombre" placeholder="Tu nombre" className="p-3 rounded w-full border border-blue-200" value={formulario.nombre} onChange={handleChange} required/>
            <input type="tel" name="telefono" placeholder="Tu teléfono" className="p-3 rounded w-full border border-blue-200" value={formulario.telefono} onChange={handleChange} required/>
          </div>

          <select name="sede" value={formulario.sede} onChange={handleChange} className="p-3 rounded w-full border border-blue-200" required>
            <option value="">Selecciona una sede</option>
            <option value="Umacollo">📍 Umacollo</option>
            <option value="Lambramani">📍 Lambramani</option>
            <option value="Cerro Colorado">📍 Cerro Colorado</option>
          </select>

          <textarea name="mensaje" placeholder="Escribe tu mensaje aquí..." className="p-3 rounded w-full border border-blue-200 min-h-[120px]" value={formulario.mensaje} onChange={handleChange} required></textarea>

          <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition">
            Enviar por WhatsApp
          </button>
        </form>
      </section>
    </main>);
};
exports.default = Contacto;
