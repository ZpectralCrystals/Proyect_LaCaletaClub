import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-500 text-black py-5 text-center">
      <div className="max-w-3xl mx-auto">
        <p>&copy; 2025 La Caleta Club. Todos los derechos reservados.</p>
        <nav className="mt-2">
          <a
            href="/terminos"
            className="text-black mx-4 text-sm hover:text-white hover:underline"
          >
            Términos
          </a>
          <a
            href="/privacidad"
            className="text-black mx-4 text-sm hover:text-white hover:underline"
          >
            Privacidad
          </a>
          <a
            href="/contacto"
            className="text-black mx-4 text-sm hover:text-white hover:underline"
          >
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
