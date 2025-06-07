import { SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import ProceedToPaymentButton from "../ProceedToPaymentButton/ProceedToPaymentButton";

interface CartFooterProps {
  subtotal: number;
  onClose: () => void; // ✅ Cierra el carrito desde CartListSide
}

export default function CartFooter({ subtotal, onClose }: CartFooterProps) {
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <SheetFooter className="mt-auto pt-4">
      <div className="w-full space-y-4">
        {/* Separador visual entre productos y resumen de pago */}
        <Separator />

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
        </div>

        {/* IGV */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">IGV (18%)</span>
          <span className="font-medium">S/ {igv.toFixed(2)}</span>
        </div>

        {/* Total a pagar */}
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Total a pagar</span>
          <span className="font-bold text-sky-700">S/ {total.toFixed(2)}</span>
        </div>

        {/* Botón que cierra el carrito y redirige */}
        <ProceedToPaymentButton onClose={onClose} />
      </div>
    </SheetFooter>
  );
}
// Compare this snippet from src/components/CartFooter/CartFooter.tsx:
//               size="icon"  