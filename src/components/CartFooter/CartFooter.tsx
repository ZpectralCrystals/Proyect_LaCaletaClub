import { SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ProceedToPaymentButton from "../ProceedToPaymentButton/ProceedToPaymentButton";

interface CartFooterProps {
  subtotal: number;
}

export default function CartFooter({ subtotal }: CartFooterProps) {
  return (
    <SheetFooter className="mt-auto pt-4">
      <div className="w-full space-y-4">
        <Separator />
        <div className="flex items-center justify-between">
          <span className="font-medium">Subtotal</span>
          <span className="font-bold">S/ {subtotal.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-gray-900 hover:bg-gray-800">
          <ProceedToPaymentButton />
        </Button>
      </div>
    </SheetFooter>
  );
}