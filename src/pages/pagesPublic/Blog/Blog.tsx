import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom"; // para redirigir al login

// Tipos de datos
interface BlogEntry {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  autor: string;
  imagen: string;
}

interface Product {
  id: number;
  name: string;
}

interface RawBlogData {
  id: number;
  titulo: string;
  descripcion: string;
  created_at: string;
  profiles: { first_name: string; last_name: string } | null;
  productostab: { image: string } | null;
}

const Blog = () => {
  // Obtener usuario autenticado
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate(); // para redireccionar a /login

  // Estados del formulario y la data
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productId, setProductId] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  // Cargar data al montar
  useEffect(() => {
    fetchActiveBlogs();
    fetchProducts();
  }, []);

  // Obtener blogs aprobados (isActive: true)
  const fetchActiveBlogs = async () => {
    const { data } = await supabase
      .from("blogtab")
      .select(`
        id, titulo, descripcion, created_at,
        profiles(first_name, last_name),
        productostab(image)
      `)
      .eq("isActive", true)
      .order("created_at", { ascending: false });

    if (data) {
      const formatted: BlogEntry[] = (data as unknown as RawBlogData[]).map((entry) => ({
        id: entry.id,
        titulo: entry.titulo,
        descripcion: entry.descripcion,
        fecha: new Date(entry.created_at).toLocaleDateString("es-PE", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        autor: entry.profiles
          ? `${entry.profiles.first_name} ${entry.profiles.last_name}`
          : "Desconocido",
        imagen: entry.productostab?.image || "/default.jpg",
      }));
      setBlogs(formatted);
    }
  };

  // Obtener lista de productos disponibles
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("productostab").select("id, name");
    if (!error && data) setProducts(data);
  };

  // Agregar nuevo blog (queda inactivo para revisión)
  const handleAgregarBlog = async () => {
    if (!user) return;
    if (!titulo || !descripcion || !productId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const { error } = await supabase.from("blogtab").insert([
      {
        titulo,
        descripcion,
        user_id: user.id,
        product_id: Number(productId),
        isActive: false, // pendiente de aprobación
        searchTree: Date.now(), // timestamp para búsquedas u orden
      },
    ]);

    if (!error) {
      alert("Blog enviado para revisión");
      setTitulo("");
      setDescripcion("");
      setProductId("");
    }
  };

  // Render principal
  return (
    <main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Blog Cevichero</h1>

        {/* Mostrar formulario solo si está logueado */}
        {user ? (
          <div className="mb-10 bg-sky-50 p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-sky-700">Agrega una entrada al blog</h2>
            <Input
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <Input
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un producto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((prod) => (
                  <SelectItem key={prod.id} value={prod.id.toString()}>
                    {prod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAgregarBlog}>Enviar blog</Button>
          </div>
        ) : (
          // Mostrar mensaje si NO ha iniciado sesión
          <div className="mb-10 bg-yellow-50 p-6 rounded-lg shadow text-center text-yellow-800">
            <p className="text-lg font-medium mb-4">
              🔒 Inicia sesión para poder agregar una entrada al blog.
            </p>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Ir a iniciar sesión
            </Button>
          </div>
        )}

        {/* Mostrar blogs activos */}
        <div className="grid md:grid-cols-2 gap-10">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-blue-50 rounded-xl shadow overflow-hidden"
            >
              <div className="md:w-1/2">
                <img
                  src={post.imagen}
                  alt={post.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-sky-700">{post.titulo}</h2>
                  <p className="text-gray-700 text-sm mt-2">{post.descripcion}</p>
                </div>
                <ul className="text-xs text-blue-600 mt-4">
                  <li>📅 {post.fecha}</li>
                  <li>👨‍🍳 {post.autor}</li>
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
