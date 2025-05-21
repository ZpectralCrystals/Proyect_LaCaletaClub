import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-300">
        <Link to="/" className="text-xl font-bold text-yellow-400">
          <img src="/logo/la_caleta_texto_claro_transparente.png" alt="La Caleta Logo" className="w-80 h-30" />
        </Link>
        </div>

        {/* Botón hamburguesa (móvil) */}
        <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación desktop */}
        <nav className="hidden lg:flex space-x-6 text-white">
          <Link to="/" className="hover:text-blue-400">Inicio</Link>
          <Link to="/menu" className="hover:text-blue-400">Menú</Link>
          <Link to="/paginas" className="hover:text-blue-400">Páginas</Link>
          <Link to="/blog" className="hover:text-blue-400">Blog</Link>
          <Link to="/recomendaciones" className="hover:text-blue-400">Recomendaciones</Link>
          <Link to="/contacto" className="hover:text-blue-400">Contacto</Link>
          <Link to="/carrito" className="hover:text-blue-400">Carrito</Link>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav className="lg:hidden bg-gray-900 px-6 pb-4 space-y-2 text-white">
          <Link to="/" onClick={closeMenu} className="block hover:text-blue-400">Inicio</Link>
          <Link to="/menu" onClick={closeMenu} className="block hover:text-blue-400">Menú</Link>
          <Link to="/paginas" onClick={closeMenu} className="block hover:text-blue-400">Páginas</Link>
          <Link to="/blog" onClick={closeMenu} className="block hover:text-blue-400">Blog</Link>
          <Link to="/recomendaciones" onClick={closeMenu} className="block hover:text-blue-400">Recomendaciones</Link>
          <Link to="/contacto" onClick={closeMenu} className="block hover:text-blue-400">Contacto</Link>
          <Link to="/carrito" onClick={closeMenu} className="block hover:text-blue-400">Carrito</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
