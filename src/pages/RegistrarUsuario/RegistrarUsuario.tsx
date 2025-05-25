import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const RegistrarUsuario = () =>{

    return(
        <section className="h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Regístrate</h1>
              <p  className="text-gray-700 mt-2 text-sm">
                Regístrate y obtén grandes beneficios
              </p>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre Completo
              </label>
              <Input
                id="nombre"
                type="nombre"
                name="nombre"              
               
              />
            </div>
             <div className="space-y-1">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Documento de Identificación
              </label>
              <Input
                id="nombre"
                type="number"
                name="nombre"              
               
              />
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
              <ul className="text-xs text-gray-500 mt-1 list-disc pl-5">
                <li>Al menos 8 carácteres</li>
                <li>Al menos un número (0-9) o símbolo especial</li>
              </ul>
            </div>
            {/* Checkbox Términos */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terminos"
                className="accent-blue-600"
                required
              />
              <label htmlFor="terminos" className="text-sm text-gray-700">
                Acepto los <a href="#" className="text-blue-600 underline">Términos y Condiciones</a>
              </label>
            </div>
            <div className="flex justify-center items-center">
              <Button  className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full shadow-lg center" type="submit">
                Registrarme
              </Button>
            </div>
            <p className="text-sm text-center text-gray-600">
              ¿Ya te registraste? {" "}
              <Link
                to="/iniciasesion"
                className="text-blue-600 hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>

    );
};

export default RegistrarUsuario;