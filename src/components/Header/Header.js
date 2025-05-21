"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Header = function () {
    return (<header className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-lg px-[160px]">
      <div className="text-xl font-bold">PONERLOGO</div>
      <nav className="flex space-x-4">
        <react_router_dom_1.Link to="/" className="text-white hover:text-blue-400 transition-colors">
          Inicio
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/menu" className="text-white hover:text-blue-400 transition-colors">
          Menu
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/paginas" className="text-white hover:text-blue-400 transition-colors">
          Paginas
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/blog" className="text-white hover:text-blue-400 transition-colors">
          Blog
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/recomendaciones" className="text-white hover:text-blue-400 transition-colors">
          Recomendaciones
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/contacto" className="text-white hover:text-blue-400 transition-colors">
          Contacto
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/carrito" className="text-white hover:text-blue-400 transition-colors">
          Carrito
        </react_router_dom_1.Link>
      </nav>
    </header>);
};
exports.default = Header;
