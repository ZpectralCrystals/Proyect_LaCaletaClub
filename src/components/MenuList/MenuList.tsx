import { useEffect, useState } from "react";
import MenuItem from "./MenuItem/MenuItem";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  description: string;
  image: string;
  varietyOptions: string[];
  isActive: boolean;
}

interface Categoria {
  id: number;
  descripcion: string;
  isActive: boolean;
}

export function MenuList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data: productsData, error: productsError } = await supabase
        .from("productostab")
        .select("id, name, type, price, description, image, varietyOptions, isActive")
        .eq("isActive", true);

      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categoriatab")
        .select("id, descripcion, isActive")
        .eq("isActive", true);

      if (productsError) {
        console.error("Error al cargar productos:", productsError.message);
      } else if (categoriesError) {
        console.error("Error al cargar categorías:", categoriesError.message);
      } else {
        const map: Record<number, string> = {};
        (categoriesData as Categoria[]).forEach((cat) => {
          map[cat.id] = cat.descripcion;
        });

        setProducts(productsData as Product[]);
        setFilteredProducts(productsData as Product[]);
        setCategoryMap(map);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  // Filtro dinámico
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== null) {
      filtered = filtered.filter((p) => p.type === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="lg:mt-24 sm:mt-15 px-4">
      <h1 className="text-sky-800 text-lg font-semibold text-center">Agrega tus platos para tu carrito</h1>

      <div>
        {/* Buscador */}
        <div className="flex justify-center my-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md w-full max-w-md"
          />
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded-md border ${selectedCategory === null ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </button>
          {Object.entries(categoryMap).map(([id, name]) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(Number(id))}
              className={`px-3 py-1 rounded-md border ${selectedCategory === Number(id) ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {/* Lista de productos */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <MenuItem
                key={product.id}
                product={product}
                categoryMap={categoryMap}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No se encontraron productos.</p>
          )}
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======
export default MenuList;
>>>>>>> timothy-coder
