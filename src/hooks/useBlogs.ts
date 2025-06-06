import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Definir tipos para los datos
interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  product_id: number;
  isActive: boolean;
}

interface Product {
  id: number;
  name: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Especificamos que es un array de objetos Blog
  const [products, setProducts] = useState<Product[]>([]); // Especificamos que es un array de objetos Product
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los blogs y los productos
  const fetchData = async () => {
    try {
      const { data: blogsData, error: blogsError } = await supabase
        .from('blogtab')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: productsData, error: productsError } = await supabase
        .from('productostab')
        .select('id, name');

      if (blogsError) {
        setError('Error cargando blogs');
      } else {
        setBlogs(blogsData || []);
      }

      if (productsError) {
        setError('Error cargando productos');
      } else {
        setProducts(productsData || []);
      }
    } catch (error) {
      setError('Error inesperado al cargar los datos');
      console.error(error);
    }
  };

  // Llamar a la función de carga en el efecto
  useEffect(() => {
    fetchData();
  }, []);

  return { blogs, products, error, fetchData };
}
