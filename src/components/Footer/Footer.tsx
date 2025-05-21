const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + descripción */}
        <div>
        
          <img src="/logo/la_caleta_texto_claro_transparente.png" alt="La Caleta Logo" className="w-80 h-30" />
        
          <p className="text-sm text-blue-100 leading-relaxed">
            Disfruta del mejor ceviche, acumula puntos por cada visita y canjea promociones únicas en tu cevichería favorita.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-100">Navegación</h3>
          <ul className="text-sm space-y-2 text-blue-300">
            <li><a href="/" className="hover:text-white">Inicio</a></li>
            <li><a href="/carta" className="hover:text-white">Carta</a></li>
            <li><a href="/promociones" className="hover:text-white">Promociones</a></li>
            <li><a href="/nosotros" className="hover:text-white">Nosotros</a></li>
            <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-100">Contáctanos</h3>
          <p className="text-sm text-blue-300">📍 Umacollo - Arequipa</p>
          <p className="text-sm text-blue-300">📞 913 204 134</p>
          <p className="text-sm text-blue-300">✉️ contacto@cevicheclub.pe</p>
        </div>
      </div>

      {/* Créditos */}
      <div className="text-center mt-10 text-xs text-blue-300">
        © {new Date().getFullYear()} CevicheClub. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
