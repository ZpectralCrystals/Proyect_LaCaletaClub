import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    dni: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dni") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 8) {
        setValues({ ...values, [name]: numericValue });
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { dni, firstName, lastName, email, password } = values;

  if (!dni || !firstName || !lastName || !email || !password) {
    toast.error("Por favor completa todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
        email,
        dni,
        first_name: firstName,
        last_name: lastName,
        role: 1,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || "Error al registrar");
    }

    toast.success("✅ Registrado correctamente");
    navigate("/login");
  } catch (err: any) {
    toast.error(err.message || "Error inesperado");
  }
};


  return (
    <section className="h-screen flex justify-center items-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-bold text-gray-800">Registro</h2>
              <p className="text-sm text-gray-600">
                Regístrate para comenzar a acumular puntos y promociones.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                DNI
              </label>
              <Input
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                value={values.dni}
                onChange={handleChange}
                placeholder="Ej. 87654321"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Nombres
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                placeholder="Tus apellidos"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full" type="submit">
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Register;