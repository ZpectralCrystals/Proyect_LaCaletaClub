import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

interface Producto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string; 
}

interface Categoria {
  id: string;
  descripcion: string;
}

const Menu = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string>("");

  useEffect(() => {
  const fetchData = async () => {
    // Filtramos solo categorías activas
    const { data: categoriasData, error: errorCategorias } = await supabase
      .from("categoriatab")
      .select("*")
      .eq("isActive", true); // FILTRAR AQUÍ

    // Filtramos solo productos activos
    const { data: productosData, error: errorProductos } = await supabase
      .from("productostab")
      .select("*")
      .eq("isActive", true); // FILTRAR AQUÍ

    if (errorCategorias) console.error("Error categorías:", errorCategorias);
    if (errorProductos) console.error("Error productos:", errorProductos);

    if (categoriasData && productosData) {
      setCategorias(categoriasData);
      setProductos(productosData);
      setCategoriaActiva(categoriasData[0]?.id);
    }
  };

  fetchData();
}, []);



  const productosFiltrados = productos.filter((p) => p.type === categoriaActiva);

  return (
    <main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-sky-800 mb-4">Nuestro Menú</h1>
        <p className="text-gray-600 mb-10">Elige una categoría para explorar nuestros platos</p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-5 py-2 rounded-full border font-semibold transition-all ${
                categoriaActiva === cat.id
                  ? "bg-sky-700 text-white"
                  : "bg-white border-sky-300 text-sky-700 hover:bg-sky-100"
              }`}
            >
              {cat.descripcion}
            </button>
          ))}
        </div>

        {/* Animación de contenido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={categoriaActiva}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 text-left"
          >
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-blue-50 p-6 rounded-xl shadow-md border-l-4 border-sky-700"
              >
                <h2 className="text-xl font-bold text-sky-800">{producto.name}</h2>
                <p className="text-gray-700 mt-2">{producto.description}</p>
                <p className="text-sky-600 font-semibold mt-4 text-lg">S/ {producto.price}</p>
                {producto.image && (
                  <img src={producto.image} alt={producto.name} className="mt-4 rounded-md" />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Menu;
