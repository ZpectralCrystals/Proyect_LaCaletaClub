import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

/**
 * 🎉 Componente principal del Panel de Administración
 * - Muestra un mensaje de bienvenida al entrar
 * - Puedes agregar aquí tarjetas con métricas más adelante
 */
const DashboardAdmin = () => {
  // 🧠 Obtenemos el nombre del usuario desde Redux (si está logueado)
  const user = useSelector((state: RootState) => state.auth.user);

  // 🔔 Mostrar toast de bienvenida al montar el componente
  useEffect(() => {
    toast.info(`Bienvenido${user?.first_name ? `, ${user.first_name}` : ""} 👋`, {
      description: "Aquí puedes administrar tu cevichería.",
      duration: 4000,
    });
  }, [user]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-sky-900">Panel de Administración</h1>
      <p className="text-gray-600">
        Accede a la gestión de productos, usuarios, recomendaciones y más desde aquí.
      </p>

      {/* 💡 Aquí podrías agregar tarjetas de resumen, gráficas, etc. */}
    </div>
  );
};

export default DashboardAdmin;
