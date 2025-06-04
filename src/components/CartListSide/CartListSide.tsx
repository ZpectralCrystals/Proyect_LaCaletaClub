import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { CartItem } from "@/redux/cartSlice";

import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/redux/cartSlice";

interface CartListSideProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartListSide({ isCartOpen, setIsCartOpen }: CartListSideProps) {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.products);


  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen} >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative text-gray-900 hover:bg-gray-100 hover:text-gray-900"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalUnits > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-white hover:text-gray-900"
            >
              {totalUnits}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden mt-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Tu carrito está vacío</h3>
              <p className="text-gray-500 text-sm">
                No has agregado productos a tu carrito todavía.
              </p>
              <Button
                className="mt-6 bg-gray-900 hover:bg-gray-800"
                onClick={() => setIsCartOpen(false)}
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-4 pr-4">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-4">
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
                            className="h-6 w-6"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="mt-auto pt-4">
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">S/ {subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-gray-900 hover:bg-gray-800">
                Proceder al pago
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
