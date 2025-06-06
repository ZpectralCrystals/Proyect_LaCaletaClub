
import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabaseClient";
import { useBlogs } from '@/hooks/useBlogs'; // Importar el hook

export default function CommentsAdmin() {
  const { blogs, fetchData } = useBlogs();
  
const toggleActive = async (id: number, currentState: boolean) => {
    try {
      const { error } = await supabase.from('blogtab').update({ isActive: !currentState }).eq('id', id);
      if (error) throw error;
      fetchData(); // Recargar los blogs después de cambiar el estado
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  const handleDelete = async (id: number) => {
    await supabase.from('blogtab').delete().eq('id', id);
    fetchData(); // Recargar los blogs después de eliminar
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-800">Gestión de Blogs</h1>
      

      {/* Renderizar los blogs */}
      <div className="space-y-4">
        {blogs.map((blog: any) => (
          <div key={blog.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{blog.titulo}</h2>
              <p className="text-sm text-gray-600">{blog.descripcion}</p>
              <p className="text-xs text-gray-500">Producto ID: {blog.product_id}</p>
            </div>
            <div className="space-x-2">
              
              <Button variant="outline" onClick={() => toggleActive(blog.id, blog.isActive)}>
                {blog.isActive ? "Desactivar" : "Activar"}
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(blog.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
