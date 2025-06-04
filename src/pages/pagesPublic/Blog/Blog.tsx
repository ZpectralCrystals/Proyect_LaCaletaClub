import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

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

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productId, setProductId] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    fetchActiveBlogs();
    fetchProducts();
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSessionUser(session?.user || null);
  };

  const fetchActiveBlogs = async () => {
    const { data, error } = await supabase
      .from("blogtab")
      .select("id, titulo, descripcion, created_at, profiles(first_name, last_name), productostab(image)")
      .eq("isActive", true)
      .order("created_at", { ascending: false });

    if (data) {
      const formatted: BlogEntry[] = data.map((entry: any) => ({
        id: entry.id,
        titulo: entry.titulo,
        descripcion: entry.descripcion,
        fecha: new Date(entry.created_at).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }),
        autor: entry.profiles?.first_name + " " + entry.profiles?.last_name,
        imagen: entry.productostab?.image || "/default.jpg",
      }));
      setBlogs(formatted);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("productostab").select("id, name");
    if (!error && data) setProducts(data);
  };

  const handleAgregarBlog = async () => {
    if (!sessionUser || ![2, 3, 4, 5].includes(sessionUser.role)) return;
    if (!titulo || !descripcion || !productId) return alert("Todos los campos son obligatorios");

    const { error } = await supabase.from("blogtab").insert([
      {
        titulo,
        descripcion,
        user_id: sessionUser.id,
        product_id: Number(productId),
        isActive: false,
        searchTree: Date.now(),
      },
    ]);

    if (!error) {
      alert("Blog enviado para revisión");
      setTitulo("");
      setDescripcion("");
      setProductId("");
    }
  };

  const handleAgregarCadena = async (blogId: number) => {
    if (!sessionUser || !newComment.trim() || ![2, 3, 4, 5].includes(sessionUser.role)) return;
    const { error } = await supabase
      .from("blogtab")
      .insert({
        titulo: "(continuación)",
        descripcion: newComment,
        user_id: sessionUser.id,
        product_id: null,
        isActive: false,
        searchTree: blogId,
      });
    if (!error) {
      alert("Cadena enviada para revisión");
      setNewComment("");
    }
  };

  return (
    <main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Blog Cevichero</h1>

        {sessionUser && [2, 3, 4, 5].includes(sessionUser.role) && (
          <div className="mb-10 bg-sky-50 p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-sky-700">Agrega una entrada al blog</h2>
            <Input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            <Input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un producto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((prod) => (
                  <SelectItem key={prod.id} value={prod.id.toString()}>{prod.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAgregarBlog}>Enviar blog</Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {blogs.map((post) => (
            <div key={post.id} className="flex flex-col md:flex-row bg-blue-50 rounded-xl shadow overflow-hidden">
              <div className="md:w-1/2">
                <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover" />
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
                {sessionUser && [2, 3, 4, 5].includes(sessionUser.role) && (
                  <div className="mt-4 space-y-2">
                    <Input
                      placeholder="Agrega un comentario a esta cadena"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={() => handleAgregarCadena(post.id)}>Agregar a la cadena</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
