import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PerfilAdministrador() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const mockProfile = {
    email: "admin@ejemplo.com",
    nombre: "Juan Pérez",
    telefono: "+51 987 654 321",
    rol: "Administrador",
  };

  const handleChangePassword = () => {
    setMessage("Contraseña actualizada correctamente.");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold text-sky-700 text-center">
            Perfil
          </h1>

          <div className="space-y-2">
            <div>
              <Label>Email</Label>
              <Input value={mockProfile.email} readOnly />
            </div>
            <div>
              <Label>Nombre</Label>
              <Input value={mockProfile.nombre} readOnly />
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input value={mockProfile.telefono} readOnly />
            </div>
            <div>
              <Label>Rol</Label>
              <Input value={mockProfile.rol} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-sky-600">Cambiar Contraseña</h2>
          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleChangePassword}>Cambiar Contraseña</Button>
          {message && <p className="text-sm text-green-600 text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
