import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import Header from "../Header/Header";

const Navbar = () => {
  // 🔄 Estado para controlar si el menú móvil está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔁 Alterna entre abrir y cerrar menú
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ❌ Cierra el menú cuando se hace clic en un enlace
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* 🧭 Contenedor principal del navbar */}
      <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
        {/* 🖥️ Header completo solo en pantallas grandes */}
        <div className="hidden lg:block">
          <Header />
        </div>

        {/* 📱 Barra superior para logo y botón hamburguesa (móvil) */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* 🐟 Logo del sitio */}
          <div className="text-2xl font-bold text-blue-300">
            <Link to="/" className="text-xl font-bold text-yellow-400">
              <img
                src="/logo/LaCaleta_logo_light.png"
                alt="La Caleta Logo"
                className="w-72 h-auto"
              />
            </Link>
          </div>

          {/* ☰ Botón hamburguesa visible solo en móvil */}
          <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* 🧭 Menú de navegación visible solo en escritorio */}
          <nav className="hidden lg:flex items-center space-x-6 text-white">
            <Link to="/" className="hover:text-blue-400">Inicio</Link>
            <Link to="/menu" className="hover:text-blue-400">Menú</Link>
            <Link to="/blog" className="hover:text-blue-400">Blog</Link>
            <Link to="/recomendaciones" className="hover:text-blue-400">Recomendaciones</Link>
            <Link to="/contacto" className="hover:text-blue-400">Contacto</Link>
            {/* 🔐 Rutas comentadas para login y registro */}
            {/* <Link to="/iniciasesion" className="hover:text-blue-400">Inicia Sesión</Link>
            <Link to="/registro" className="hover:text-blue-400">Registro</Link> */}

            {/* 🌐 Redes sociales (escritorio) */}
            <div className="flex items-center space-x-3 text-xl text-blue-300 pl-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaTiktok />
              </a>
            </div>
          </nav>
        </div>

        {/* 📱 Menú desplegable móvil cuando está abierto */}
        {menuOpen && (
          <nav className="lg:hidden bg-gray-900 px-6 pb-4 space-y-2 text-white">
            <Link to="/" onClick={closeMenu} className="block hover:text-blue-400">Inicio</Link>
            <Link to="/menu" onClick={closeMenu} className="block hover:text-blue-400">Menú</Link>
            <Link to="/paginas" onClick={closeMenu} className="block hover:text-blue-400">Páginas</Link>
            <Link to="/blog" onClick={closeMenu} className="block hover:text-blue-400">Blog</Link>
            <Link to="/recomendaciones" onClick={closeMenu} className="block hover:text-blue-400">Recomendaciones</Link>
            <Link to="/contacto" onClick={closeMenu} className="block hover:text-blue-400">Contacto</Link>
            <Link to="/iniciasesion" onClick={closeMenu} className="block hover:text-blue-400">Inicia Sesión</Link>
            <Link to="/registro" onClick={closeMenu} className="block hover:text-blue-400">Registro</Link>

            {/* 🌐 Redes sociales (móvil) */}
            <div className="flex justify-center pt-4 space-x-4 text-xl text-blue-300">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaTiktok />
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
