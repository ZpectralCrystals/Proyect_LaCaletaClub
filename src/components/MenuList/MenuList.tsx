import { useEffect, useState } from "react";
import MenuItem from "./MenuItem/MenuItem";

interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  image: string;
  description: string;
  varietyOptions: string[];
  isActive: boolean;
}

interface Categoria {
  id: number;
  descripcion: string;
  isActive: boolean;
}

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

  // 🔄 Obtener productos y categorías desde Django
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const token = localStorage.getItem("access"); // Obtener el token JWT
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Agregar token si existe
      };

      try {
        // Hacer peticiones simultáneas para obtener productos y categorías desde Django
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/productos/", { headers }), // Reemplazar con tu API Django
          fetch("http://127.0.0.1:8000/api/categorias/", { headers }), // Reemplazar con tu API Django
        ]);

        // Validación de las respuestas
        if (!productsRes.ok) {
          throw new Error("Error al cargar productos");
        }
        if (!categoriesRes.ok) {
          throw new Error("Error al cargar categorías");
        }

        // Procesar los datos de la respuesta
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        // Mapeo de categorías a productos
        const map = categoriesData.reduce((acc: Record<number, string>, cat: Categoria) => {
          acc[cat.id] = cat.descripcion;
          return acc;
        }, {});

        // Actualizar los estados con los datos obtenidos
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategoryMap(map);
      } catch (error) {
        console.error("Error al cargar productos o categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // El hook solo se ejecutará una vez al montar el componente

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

