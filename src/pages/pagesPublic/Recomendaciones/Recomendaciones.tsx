import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Tipo final para renderizar en la app
interface Recomendacion {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

const Recomendaciones = () => {
  const [resenas, setResenas] = useState<Recomendacion[]>([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const obtenerResenas = async () => {
    const { data, error } = await supabase
      .from("recomendacionestab")
      .select(`
        id, created_at, userid, isActive, description,
        profile:userid (first_name, last_name, avatar_url)
      `)
      .eq("isActive", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const resenasFormateadas: Recomendacion[] = (data as any[]).map((item) => ({
        id: item.id as number,
        created_at: item.created_at as string,
        userid: item.userid as string,
        isActive: item.isActive as boolean,
        description: item.description as string,
        profile: {
          first_name: item.profile.first_name as string,
          last_name: item.profile.last_name as string,
          avatar_url: (item.profile.avatar_url as string) ?? "/default-avatar.png",
        },
      }));

      setResenas(resenasFormateadas);
    } else {
      console.error("Error al obtener recomendaciones:", error);
    }
  };

  useEffect(() => {
    obtenerResenas();
  }, []);

  const handleSubmit = async () => {
    if (!nuevaResena.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("recomendacionestab").insert({
      description: nuevaResena,
      userid: user?.id,
      isActive: false,
    });

    if (!error) {
      setNuevaResena("");
      alert("Tu recomendación ha sido enviada para revisión.");
    } else {
      alert("Hubo un error al enviar tu recomendación.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Recomendaciones</h1>

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

        {user && (
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
        )}
      </section>
    </main>
  );
};

export default Recomendaciones;
