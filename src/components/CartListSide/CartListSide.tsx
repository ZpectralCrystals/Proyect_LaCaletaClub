import React from "react";
import { ShoppingCart, Minus, Plus, Trash2, } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartFooter from "@/components/CartFooter/CartFooter";
import { useCart } from "@/hooks/useCart";
import { useCartTotals } from "@/hooks/useCartTotals";
import type { CartItem } from "@/redux/cartSlice";
// Tipado para las props que recibe este componente
interface CartListSideProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// Mensaje de carrito vacío
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-4 rounded-full">
        <ShoppingCart className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">Tu carrito está vacío</h3>
      <p className="text-gray-500 text-sm">
        No has agregado productos a tu carrito todavía.
      </p>
      <Button className="mt-6 bg-gray-900 hover:bg-gray-800" onClick={onClose}>
        Continuar comprando
      </Button>
    </div>
  );
}
// Ítem individual del carrito
const CartListItem = React.memo(function CartListItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-20 w-20 rounded-md border bg-gray-50 flex-shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
        <div className="flex items-center justify-between mt-2">
          <p className="font-medium">S/ {item.price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label="Disminuir cantidad"
              onClick={onDecrement}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm w-4 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label="Aumentar cantidad"
              onClick={onIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-400 hover:text-red-500"
        aria-label="Eliminar producto"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
});
// Componente principal
export default function CartListSide({ isCartOpen, setIsCartOpen }: CartListSideProps) {
  const { cartItems, handleIncrement, handleDecrement, handleRemove } = useCart();
  const { subtotal } = useCartTotals(cartItems);
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-screen animate-in slide-in-from-right duration-300">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
            {cartItems.length > 0 && (
              <span className="ml-auto text-xs font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden mt-6">
          {cartItems.length === 0 ? (
            <EmptyCart onClose={() => setIsCartOpen(false)} />
          ) : (
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-4 pr-4">
                {cartItems.map((item) => (
                  <CartListItem
                    key={item.id}
                    item={item}
                    onIncrement={() => handleIncrement(item.id)}
                    onDecrement={() => handleDecrement(item.id)}
                    onRemove={() => handleRemove(item.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        {cartItems.length > 0 && (
          <CartFooter subtotal={subtotal} onClose={() => setIsCartOpen(false)} />
        )}
      </SheetContent>
    </Sheet>
  );
}
