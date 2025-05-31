import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./toast";
import type { ToastOptions } from "./use-toast";
import { registerToast } from "./use-toast";

export function Toaster() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  useEffect(() => {
    registerToast((options) => {
      setToasts((prev) => [...prev, options]);
      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3500);
    });
  }, []);

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
