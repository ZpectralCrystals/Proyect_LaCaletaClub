import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const IniciarSesion = () =>{

    return(
        <section className="h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Iniciar Sesión</h1>
              <p  className="text-gray-700 mt-2 text-sm">
                Ingresa tu correo y contraseña.
              </p>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"              
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
              />
            </div>
            <div className="flex justify-center items-center">
              <Button  className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full shadow-lg center" type="submit">
                Inicia Sesión
              </Button>
            </div>
            <p className="text-sm text-center text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="text-blue-600 hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>

    );
};

export default IniciarSesion;