import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AppSidebar } from "@/pages/pagesAdmin/AppSidebar/AppSidebar";

/**
 * 🧱 Layout general del panel administrativo.
 * - Muestra un sidebar fijo en pantallas grandes.
 * - Contiene un <Outlet /> para cargar las páginas internas.
 * - Integra <Toaster /> para notificaciones en el entorno admin.
 */
const LayoutAdmin = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* 🧭 Sidebar lateral (visible en pantallas grandes) */}
      <aside className="lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-screen z-10">
        <AppSidebar />
      </aside>

      {/* 📝 Contenido principal del dashboard */}
      <main className="flex-1 pt-16 lg:pt-0 lg:pl-64">
        {/* 🔔 Toaster para notificaciones (toast.info, toast.success, etc.) */}
        <Toaster position="top-right" richColors expand={true} />

        {/* 📦 Área donde se renderizan las páginas hijas */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutAdmin;
// Nota: Este layout está diseñado para ser usado en el contexto de un panel administrativo,
// donde se espera que haya un sidebar fijo y un área principal para el contenido.  