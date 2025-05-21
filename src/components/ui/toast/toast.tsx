import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border px-4 py-3 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-sky-300 text-sky-800",
        success: "bg-green-50 border-green-400 text-green-800",
        destructive: "bg-red-50 border-red-400 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, className, variant, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-col">
          {title && <p className="text-sm font-semibold">{title}</p>}
          {description && <p className="text-sm text-sky-700">{description}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="text-sky-500 hover:text-sky-700">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast };
