import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// --- Tipos definidos para manejar bien los datos que vienen de Supabase ---

// Perfil del usuario que dejó la recomendación
interface Profile {
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

// Objeto completo de recomendación, incluyendo el perfil del autor
interface Recomendacion {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: Profile;
}

// Tipado del item que devuelve Supabase desde la tabla
interface RecomendacionRaw {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  } | null;
}

const Recomendaciones = () => {
  // Estado local de reseñas obtenidas de la base de datos
  const [resenas, setResenas] = useState<Recomendacion[]>([]);
  // Estado para el texto que el usuario quiere enviar
  const [nuevaResena, setNuevaResena] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtener usuario logueado desde Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // Ejecutar solo una vez al montar el componente
  useEffect(() => {
    obtenerResenas();
  }, []);

  // 🔄 Obtener reseñas activas desde Supabase
  const obtenerResenas = async () => {
    const { data, error } = await supabase
      .from("recomendacionestab")
      .select(`
        id, created_at, userid, isActive, description,
        profile:profiles!userid(first_name, last_name, avatar_url)
      `)
      .eq("isActive", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener recomendaciones:", error);
      return;
    }

    if (Array.isArray(data)) {
      const resenasFormateadas: Recomendacion[] = (data as unknown as RecomendacionRaw[]).map((item) => {
        const {
          first_name = "",
          last_name = "",
          avatar_url = "/default-avatar.png"
        } = item.profile ?? {};

        return {
          id: item.id,
          created_at: item.created_at,
          userid: item.userid,
          isActive: item.isActive,
          description: item.description,
          profile: {
            first_name,
            last_name,
            avatar_url: avatar_url || "/default-avatar.png",
          },
        };
      });

      setResenas(resenasFormateadas);
    }
  };

  // 📝 Enviar nueva recomendación
  const handleSubmit = async () => {
    if (!nuevaResena.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("recomendacionestab").insert({
      description: nuevaResena,
      userid: user?.id,
      isActive: false, // Las nuevas reseñas deben ser aprobadas
    });

    setLoading(false);

    if (error) {
      alert("Hubo un error al enviar tu recomendación.");
    } else {
      setNuevaResena("");
      alert("Tu recomendación ha sido enviada para revisión.");
    }
  };

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">
          Recomendaciones
        </h1>

        {/* 📋 Lista de recomendaciones activas */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {resenas.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <img
                src={cliente.profile.avatar_url || "/default-avatar.png"}
                alt={`${cliente.profile.first_name} ${cliente.profile.last_name}`}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-sky-200"
              />
              <h3 className="text-lg font-semibold text-sky-700">
                {cliente.profile.first_name} {cliente.profile.last_name}
              </h3>
              <p className="text-gray-700 mt-2 text-sm">“{cliente.description}”</p>
            </div>
          ))}
        </div>

        {/* ✍ Formulario solo si el usuario está logueado */}
        {user ? (
          <div className="max-w-2xl mx-auto mt-10 bg-sky-50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-sky-700 mb-4">Deja tu recomendación</h2>
            <Textarea
              value={nuevaResena}
              onChange={(e) => setNuevaResena(e.target.value)}
              placeholder="Escribe tu recomendación aquí..."
              className="mb-4"
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Enviando..." : "Enviar recomendación"}
            </Button>
          </div>
        ) : (
          // 🔒 Mostrar mensaje si no está logueado
          <div className="max-w-2xl mx-auto mt-10 bg-yellow-50 p-6 rounded-xl shadow-md text-center text-yellow-800">
            <p className="text-lg font-medium mb-4">
              🔒 Inicia sesión para dejar tu recomendación.
            </p>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Ir a iniciar sesión
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Recomendaciones;
