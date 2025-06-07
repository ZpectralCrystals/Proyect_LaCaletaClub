import { useEffect, useState } from "react";
import MenuItem from "./MenuItem/MenuItem";
import { supabase } from "@/lib/supabaseClient";
// 📦 Tipos estrictos
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
/**
 * 🍽️ MenuList: lista los productos del menú con:
 * - Filtro por categoría
 * - Búsqueda por nombre
 * - Lógica de carga de Supabase
 * - Integración con MenuItem
 */
const MenuList = () => {
  // 📊 Estado de datos
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});

  // 🔎 Filtro y búsqueda
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ⏳ Estado de carga
  const [loading, setLoading] = useState(true);

  // 🔄 Obtener productos y categorías desde Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // ⚡ Peticiones simultáneas
      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from("productostab")
          .select("id, name, type, price, description, image, varietyOptions, isActive")
          .eq("isActive", true),
        supabase
          .from("categoriatab")
          .select("id, descripcion, isActive")
          .eq("isActive", true),
      ]);

      // ❌ Errores
      if (productsRes.error) {
        console.error("Error al cargar productos:", productsRes.error.message);
      }
      if (categoriesRes.error) {
        console.error("Error al cargar categorías:", categoriesRes.error.message);
      }
      // ✅ Datos correctos
      if (productsRes.data && categoriesRes.data) {
        const productsData = productsRes.data as Product[];
        const categoriesData = categoriesRes.data as Categoria[];

        const map = categoriesData.reduce((acc, cat) => {
          acc[cat.id] = cat.descripcion;
          return acc;
        }, {} as Record<number, string>);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategoryMap(map);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  // 🎯 Aplicar búsqueda y filtro por categoría
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === null || product.type === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  // ⏳ Mensaje de carga
  if (loading) {
    return <p className="text-center text-sky-700">Cargando productos...</p>;
  }
  return (
    <div className="lg:mt-24 sm:mt-15 px-4 pb-24">
      {/* 🧾 Título */}
      <h1 className="text-sky-800 text-lg font-semibold text-center mb-4">
        Agrega tus platos para tu carrito
      </h1>
      {/* 🔍 Buscador */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md w-full max-w-md"
        />
      </div>
      {/* 🗂️ Filtro de categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-md border ${
            selectedCategory === null ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          Todos
        </button>
        {Object.entries(categoryMap).map(([id, name]) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(Number(id))}
            className={`px-3 py-1 rounded-md border ${
              selectedCategory === Number(id)
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 🧱 Grilla de productos */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <MenuItem key={product.id} product={product} categoryMap={categoryMap} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No se encontraron productos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
