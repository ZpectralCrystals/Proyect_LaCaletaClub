// src/components/ui/Toaster.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ToastOptions } from "./use-toast";
import { registerToast } from "./use-toast";
import { Toast } from "./toast";

/**
 * 📦 Componente responsable de renderizar los toasts globalmente en pantalla.
 */
export function Toaster() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  useEffect(() => {
    // 🔗 Nos suscribimos al sistema de toasts
    const unregister = registerToast((options: ToastOptions) => {
      setToasts((prev) => [...prev, options]);

      // ⏱️ Elimina automáticamente el primer toast después de 3.5s
      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3500);
    });

    // 🧹 Limpieza al desmontar (evita fugas de memoria)
    return () => unregister();
  }, []);

  // 🌀 Usamos portal para sacar el contenedor de toasts fuera del flujo normal del DOM
  return createPortal(
    <div className="fixed top-6 right-6 z-50 space-y-2 w-[320px]">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
        />
      ))}
    </div>,
    document.body
  );
}
// Nota: Este componente se encarga de renderizar los toasts en un portal,
// lo que permite que aparezcan sobre otros contenidos sin interferir con el flujo normal del DOM.