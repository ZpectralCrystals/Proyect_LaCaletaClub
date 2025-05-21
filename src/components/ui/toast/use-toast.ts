let toastHandler: ((options: ToastOptions) => void) | null = null;

type ToastVariant = "default" | "success" | "destructive";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export function useToast() {
  return {
    toast: (options: ToastOptions) => {
      if (toastHandler) toastHandler(options);
    },
  };
}

export function registerToast(fn: (options: ToastOptions) => void) {
  toastHandler = fn;
}
