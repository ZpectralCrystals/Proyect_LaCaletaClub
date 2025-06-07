import { Outlet } from "react-router-dom";

// 🌐 Componentes globales que se repiten en toda la app
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Popup from "@/components/Popup/Popup";
import Navbar from "@/components/Navbar/Navbar"; // Asegúrate de usar una ruta absoluta
import { Toaster } from "sonner"; // Notificaciones flotantes

/**
 * 💡 Componente Layout general que estructura la página:
 * - Navbar fijo arriba
 * - Footer al final
 * - ScrollToTop reinicia posición al navegar
 * - Outlet carga la página correspondiente (React Router)
 */
const Layout = () => {
  return (
    <>
      {/* 🎁 Popup global para promociones o alertas */}
      <Popup />

      {/* 🔝 Reinicia scroll al cambiar de ruta */}
      <ScrollToTop />

      {/* 🔷 Navbar global persistente */}
      <Navbar />

      {/* 🔔 Toaster (notificaciones tipo toast) */}
      <Toaster />

      {/* 📄 Contenido principal con espacio superior para navbar */}
      <div className="pt-[100px] bg-white min-h-screen">
        <main>
          <Outlet /> {/* Aquí se renderizan las páginas internas */}
        </main>

        {/* 👣 Footer global al final de todo */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
