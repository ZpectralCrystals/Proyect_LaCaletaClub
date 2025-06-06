import React from "react";
import { useSelector,useDispatch  } from "react-redux";
import type{ RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { incrementQuantity, decrementQuantity, removeFromCart } from "@/redux/cartSlice";
const Carrito: React.FC = () => {
  const dispatch = useDispatch();
  // Obtener los productos del carrito desde Redux
  const cartItems = useSelector((state: RootState) => state.cart.products);

  // Calcular el subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 p-6">
      {/* Carrito de compras */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Mi Carrito ({cartItems.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p className="text-center">Tu carrito está vacío</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.name}</p>
                  
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Precio Unitario</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Opción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>S/ {item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => dispatch(decrementQuantity(item.id))}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              className="w-20"
                              value={item.quantity}
                              readOnly
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => dispatch(incrementQuantity(item.id))}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>S/ {(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Resumen de pedido */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell className="text-right">S/ {subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Puntos</TableCell>
                <TableCell className="text-right text-green-600">-S/ 10.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Label htmlFor="usar-puntos">Usar puntos</Label>
            <Input id="usar-puntos" type="number" placeholder="Cantidad de puntos" className="mt-1" />
          </div>
          <div className="mt-4 flex justify-between font-semibold text-lg">
            <span>Precio Total</span>
            <span>S/ {(subtotal - 10).toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4">Pagar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Carrito;