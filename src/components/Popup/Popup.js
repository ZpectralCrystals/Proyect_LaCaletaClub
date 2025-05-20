"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Popup = function () {
    var _a = (0, react_1.useState)(null), anuncio = _a[0], setAnuncio = _a[1];
    (0, react_1.useEffect)(function () {
        fetch("/anuncios.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var activeAnuncio = data.find(function (item) { return item.activo === true; });
            setAnuncio(activeAnuncio || null);
        })
            .catch(function (error) { return console.error("Error al cargar el JSON:", error); });
    }, []);
    var closePopup = function () {
        setAnuncio(null);
    };
    if (!anuncio) {
        return null;
    }
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative text-center shadow-lg">
        <button onClick={closePopup} className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-700">
          &times;
        </button>
        <img src={anuncio.imagen} alt={anuncio.titulo} className="w-full h-auto rounded mb-4"/>
        <h2 className="text-xl font-bold mb-2">{anuncio.titulo}</h2>
        <p className="text-sm mb-4">{anuncio.mensaje}</p>
        <button onClick={closePopup} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          Más Información
        </button>
      </div>
    </div>);
};
exports.default = Popup;
