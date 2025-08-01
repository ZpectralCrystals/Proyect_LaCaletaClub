import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "@/hooks/useBlog";
import { useProductos } from "@/hooks/useProductos";

const Blog = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // ✅ Hooks personalizados
  const {
    blogs,
    tituloBlog,
    setTituloBlog,
    descripcionBlog,
    setDescripcionBlog,
    enviarBlog,
  } = useBlogs();

  const { productos } = useProductos();

  // Estado local para producto seleccionado
  const [productId, setProductId] = useState<string>("");

  // ✅ Manejar envío del blog
  const handleAgregarBlog = () => {
    if (!user) return navigate("/login");
    if (!tituloBlog || !descripcionBlog || !productId) {
      alert("Todos los campos son obligatorios");
      return;
    }
    enviarBlog(Number(productId));
    setProductId("");
  };

  return (
    <main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">
          Blog Cevichero
        </h1>

        {/* ✅ Formulario solo si hay usuario */}
        {user ? (
          <div className="mb-10 bg-sky-50 p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-sky-700">
              Agrega una entrada al blog
            </h2>

            <Input
              placeholder="Título"
              value={tituloBlog}
              onChange={(e) => setTituloBlog(e.target.value)}
            />

            <Input
              placeholder="Descripción"
              value={descripcionBlog}
              onChange={(e) => setDescripcionBlog(e.target.value)}
            />

            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un producto" />
              </SelectTrigger>
              <SelectContent>
                {productos.map((prod) => (
                  <SelectItem key={prod.id} value={prod.id.toString()}>
                    {prod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleAgregarBlog}>Enviar blog</Button>
          </div>
        ) : (
          <div className="mb-10 bg-yellow-50 p-6 rounded-lg shadow text-center text-yellow-800">
            <p className="text-lg font-medium mb-4">
              🔒 Inicia sesión para poder agregar una entrada al blog.
            </p>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Ir a iniciar sesión
            </Button>
          </div>
        )}

        {/* ✅ Mostrar blogs activos */}
        <div className="grid md:grid-cols-2 gap-10">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-blue-50 rounded-xl shadow overflow-hidden"
            >
              <div className="md:w-1/2">
                <img
                  src={post.producto?.image || "/default.jpg"}
                  alt={post.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-sky-700">
                    {post.titulo}
                  </h2>
                  <p className="text-gray-700 text-sm mt-2">
                    {post.descripcion}
                  </p>
                </div>
                <ul className="text-xs text-blue-600 mt-4">
                  <li>📅 {new Date(post.created_at).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
