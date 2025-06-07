import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo y descripción */}
        <div>
          <img
            src="/logo/LaCaleta_logo_light.png"
            alt="Logo de La Caleta Club"
            className="w-56 mb-4"
          />
          <p className="text-sm text-blue-100 leading-relaxed">
            Disfruta del mejor ceviche, acumula puntos por cada visita y canjea promociones únicas en tu cevichería favorita.
          </p>
        </div>
        {/* Navegación interna */}
        <nav aria-label="Enlaces de navegación">
          <h3 className="text-lg font-semibold mb-4 text-blue-100">Navegación</h3>
          <ul className="text-sm space-y-2 text-blue-300">
            <li><a href="/" className="hover:text-white transition">Inicio</a></li>
            <li><a href="/menu" className="hover:text-white transition">Menú</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/recomendaciones" className="hover:text-white transition">Recomendaciones</a></li>
            <li><a href="/contacto" className="hover:text-white transition">Contacto</a></li>
          </ul>
        </nav>
        {/* Información de contacto */}
        <address className="not-italic">
          <h3 className="text-lg font-semibold mb-4 text-blue-100">Contáctanos</h3>
          <div className="space-y-2 text-sm text-blue-300">
            <p>📍 Umacollo - Arequipa</p>
            <p>📞 913 204 134</p>

            <p>📍 Lambramani - Arequipa</p>
            <p>📞 913 204 168</p>

            <p>📍 Cerro Colorado - Arequipa</p>
            <p>📞 977 928 716</p>
          </div>
        </address>
        {/* Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-100">Síguenos</h3>
          <div className="flex space-x-4 text-blue-300 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-white transition"
            >
              <FaTiktok />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="text-center mt-10 text-xs text-blue-300 border-t border-blue-800 pt-4">
        © {new Date().getFullYear()} CevicheClub. Todos los derechos reservados.
      </div>
    </footer>
  );
};
export default Footer;
// Footer.tsx
// Footer.tsx 