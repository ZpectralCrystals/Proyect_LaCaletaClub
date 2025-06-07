// ProceedToPaymentButton.tsx

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/store";

// ✅ Nueva prop: onClose, para cerrar el carrito
interface ProceedToPaymentButtonProps {
  onClose: () => void;
}

const ProceedToPaymentButton = ({ onClose }: ProceedToPaymentButtonProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    if (user) {
      // ✅ Cierra el carrito antes de redirigir
      onClose();
      navigate("/carrito");
    } else {
      toast.error("Necesitas registrarte para proceder al pago");
    }
  };

  return (
    <Button
      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium"
      onClick={handlePaymentRedirect}
      aria-label="Proceder al pago"
    >
      Proceder al pago
    </Button>
  );
};

export default ProceedToPaymentButton;
