import { useEffect, useState } from "react";
import CarritoItem from "./CarritoItem/CarritoItem";
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

export default function CarritoList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Obtener productos activos
      const { data: productsData, error: productsError } = await supabase
        .from("productostab")
        .select("id, name, type, price, description, image, varietyOptions, isActive")
        .eq("isActive", true);

      // Obtener categorías activas
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categoriatab")
        .select("id, descripcion, isActive")
        .eq("isActive", true);

      if (productsError) {
        console.error("Error al cargar productos:", productsError.message);
      } else if (categoriesError) {
        console.error("Error al cargar categorías:", categoriesError.message);
      } else {
        // Crear el mapa de categorías activas
        const map: Record<number, string> = {};
        (categoriesData as Categoria[]).forEach((cat) => {
          map[cat.id] = cat.descripcion;
        });

        setProducts(productsData as Product[]);
        setCategoryMap(map);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="flex flex-wrap justify-center pt-20">
      {products.map((product) => (
        <CarritoItem
          key={product.id}
          product={product}
          categoryMap={categoryMap}
        />
      ))}
    </div>
  );
}
