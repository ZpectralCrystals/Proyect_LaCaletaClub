// src/components/ui/use-toast.ts

// 🔁 Manejador interno que se actualiza al llamar a registerToast
let toastHandler: ((options: ToastOptions) => void) | null = null;

// 🎨 Variantes de estilo aceptadas
export type ToastVariant = "default" | "success" | "destructive";

// 📦 Estructura de las props del toast
export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

// ✅ Hook personalizado para lanzar toasts desde cualquier componente
export function useToast() {
  return {
    toast: (options: ToastOptions) => {
      if (toastHandler) {
        toastHandler(options); // Lanza el toast registrado
      }
    },
  };
}

// ✅ Función para registrar el manejador (usado en <Toaster />)
export function registerToast(
  fn: (options: ToastOptions) => void
): () => void {
  toastHandler = fn;

  // Permite desuscribirse (buena práctica en efectos)
  return () => {
    toastHandler = null;
  };
}
