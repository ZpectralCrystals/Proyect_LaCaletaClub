import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { setUser, setError, setLoading } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import type { User } from "@/store/authSlice";

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // 🔑 Login con Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError || !authData.user) throw authError || new Error("Credenciales inválidas");

      // 📝 Obtener perfil desde tabla 'profiles'
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, email, role, first_name, last_name")
        .eq("id", authData.user.id)
        .single();

      if (profileError || !profileData) throw profileError || new Error("Error al obtener perfil");

      const userData: User = {
        id: profileData.id,
        email: profileData.email,
        role: Number(profileData.role),
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
      };

      dispatch(setUser(userData));
      toast.success(`Bienvenido ${userData.first_name || userData.email}`);

      // 🔄 Redirección por rol
      if ([2, 3, 4, 5].includes(userData.role)) {
        navigate("/admin/");
      } else if (userData.role === 1) {
        navigate("/");
      } else {
        navigate("/unauthorized");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error inesperado";
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-800">Iniciar sesión</h2>
              <p className="text-sm text-gray-600">
                Ingresa tu correo y contraseña para acceder.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
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
                value={values.password}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full" type="submit">
              Iniciar sesión
            </Button>

            <p className="text-sm text-center text-gray-600">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="text-blue-600 hover:underline font-medium">
                Regístrate aquí
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Login;