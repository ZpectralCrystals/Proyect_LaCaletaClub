import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Carrito: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Carrito de compras */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Mi Carrito (2 items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded overflow-hidden">
              <img src="/ruta/a/imagen.jpg" alt="Producto" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">Nombre del Plato</p>
              <p className="text-sm text-muted-foreground">Categoría</p>
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
                    <TableCell>S/ 20.00</TableCell>
                    <TableCell>
                      {/* Aquí podrías usar un componente contador si tienes */}
                      <Input type="number" className="w-20" defaultValue={1} />
                    </TableCell>
                    <TableCell>S/ 20.00</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">Eliminar</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
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
                <TableCell className="text-right">S/ 20.00</TableCell>
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
            <span>S/ 10.00</span>
          </div>
          <Button className="w-full mt-4">Pagar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Carrito;
