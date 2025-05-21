"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var fa_1 = require("react-icons/fa");
var Navbar = function () {
    var _a = (0, react_1.useState)(false), menuOpen = _a[0], setMenuOpen = _a[1];
    var toggleMenu = function () { return setMenuOpen(!menuOpen); };
    var closeMenu = function () { return setMenuOpen(false); };
    return (<header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-300">PONERLOGO</div>

        {/* Botón hamburguesa (móvil) */}
        <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
          {menuOpen ? <fa_1.FaTimes /> : <fa_1.FaBars />}
        </button>

        {/* Navegación desktop */}
        <nav className="hidden lg:flex space-x-6 text-white">
          <react_router_dom_1.Link to="/" className="hover:text-blue-400">Inicio</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/menu" className="hover:text-blue-400">Menú</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/paginas" className="hover:text-blue-400">Páginas</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/blog" className="hover:text-blue-400">Blog</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/recomendaciones" className="hover:text-blue-400">Recomendaciones</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/contacto" className="hover:text-blue-400">Contacto</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/carrito" className="hover:text-blue-400">Carrito</react_router_dom_1.Link>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (<nav className="lg:hidden bg-gray-900 px-6 pb-4 space-y-2 text-white">
          <react_router_dom_1.Link to="/" onClick={closeMenu} className="block hover:text-blue-400">Inicio</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/menu" onClick={closeMenu} className="block hover:text-blue-400">Menú</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/paginas" onClick={closeMenu} className="block hover:text-blue-400">Páginas</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/blog" onClick={closeMenu} className="block hover:text-blue-400">Blog</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/recomendaciones" onClick={closeMenu} className="block hover:text-blue-400">Recomendaciones</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/contacto" onClick={closeMenu} className="block hover:text-blue-400">Contacto</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/carrito" onClick={closeMenu} className="block hover:text-blue-400">Carrito</react_router_dom_1.Link>
        </nav>)}
    </header>);
};
exports.default = Navbar;
