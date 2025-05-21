import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-lg px-[160px]">
      <div className="text-xl font-bold">PONERLOGO</div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-white hover:text-blue-400 transition-colors">
          Inicio
        </Link>
        <Link to="/menu" className="text-white hover:text-blue-400 transition-colors">
          Menu
        </Link>
        <Link to="/paginas" className="text-white hover:text-blue-400 transition-colors">
          Paginas
        </Link>
        <Link to="/blog" className="text-white hover:text-blue-400 transition-colors">
          Blog
        </Link>
        <Link to="/recomendaciones" className="text-white hover:text-blue-400 transition-colors">
          Recomendaciones
        </Link>
        <Link to="/contacto" className="text-white hover:text-blue-400 transition-colors">
          Contacto
        </Link>
        <Link to="/carrito" className="text-white hover:text-blue-400 transition-colors">
          Carrito
        </Link>
      </nav>
    </header>
  );
};

export default Header;
