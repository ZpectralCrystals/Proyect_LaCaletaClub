import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { incrementQuantity, decrementQuantity, removeFromCart } from "@/redux/cartSlice";
import { supabase } from "@/lib/supabaseClient"; // Importa Supabase
import { toast } from "sonner";

const Carrito: React.FC = () => {
  const dispatch = useDispatch();
  // Obtener los productos del carrito desde Redux
  const cartItems = useSelector((state: RootState) => state.cart.products);

  // Estado para los puntos disponibles del usuario
  const [availablePoints, setAvailablePoints] = useState<number>(0);
  const [pointsToApply, setPointsToApply] = useState<number>(0); // Puntos que el usuario quiere aplicar

  // Calcular el subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calcular el precio total después de aplicar los puntos
  const totalAfterPoints = subtotal - pointsToApply;

  // Obtener puntos del usuario desde Supabase
  useEffect(() => {
    const getUserPoints = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("points")
          .eq("id", user.id) // Obtener los puntos del usuario logueado
          .single(); // Asegurarse de obtener solo un registro

        if (error) {
          console.error("Error obteniendo puntos del usuario:", error);
        } else {
          setAvailablePoints(data?.points || 0); // Establecer los puntos disponibles
        }
      }
    };

    getUserPoints(); // Llamar a la función cuando se cargue el componente
  }, []);

  // Función para manejar el cambio en el input de los puntos
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const points = parseInt(e.target.value);
    if (points <= availablePoints) {
      setPointsToApply(points); // Solo permitir aplicar puntos que no excedan los disponibles
    } else {
      toast.error("No puedes aplicar más puntos de los que tienes disponibles");
    }
  };

  const handlePago = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      toast.error("Debes iniciar sesión para realizar la compra.");
      return;
    }

    const userId = session.user.id;

    // Registrar cada producto en la tabla 'ventas'
    const productosVenta = cartItems.map((item) => ({
      user_id: userId,
      producto: item.name,
      cantidad: item.quantity,
      monto: item.price * item.quantity,
      puntos_usados: pointsToApply, // Puntos utilizados
    }));

    const { error: ventaError } = await supabase.from("ventas").insert(productosVenta);

    if (ventaError) {
      toast.error("Error registrando la venta.");
      return;
    }

    // Restar los puntos del usuario
    const { error: puntosError } = await supabase
      .from("profiles")
      .update({
        points: availablePoints - pointsToApply,
      })
      .eq("id", userId);

    if (puntosError) {
      toast.error("Error actualizando los puntos.");
      return;
    }

    toast.success("Compra realizada exitosamente.");
  };

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
                <TableCell>Puntos disponibles</TableCell>
                <TableCell className="text-right text-green-600">{availablePoints} puntos</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Puntos aplicados</TableCell>
                <TableCell className="text-right text-green-600">-S/ {pointsToApply.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Label htmlFor="usar-puntos">Usar puntos</Label>
            <Input
              id="usar-puntos"
              type="number"
              placeholder="Cantidad de puntos"
              className="mt-1"
              value={pointsToApply}
              onChange={handlePointsChange}
              max={availablePoints} // Limitar el número de puntos a los puntos disponibles
            />
          </div>
          <div className="mt-4 flex justify-between font-semibold text-lg">
            <span>Precio Total</span>
            <span>S/ {totalAfterPoints.toFixed(2)}</span>
          </div>
          <Button onClick={handlePago} className="w-full mt-4">
            Pagar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Carrito;
