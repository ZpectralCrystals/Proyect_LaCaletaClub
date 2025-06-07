import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRecomendaciones } from "@/hooks/useRecomendaciones";
import RecomendacionCard from "@/components/RecomendacionesCard/RecomendacionesCard";

const Recomendaciones = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // Usamos el hook para gestionar toda la lógica
  const {
    resenas,
    nuevaResena,
    setNuevaResena,
    enviarResena,
    loading,
  } = useRecomendaciones(user?.id);

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">
          Recomendaciones
        </h1>

        {/* 🗂 Lista de recomendaciones */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {resenas
            .filter((r) => r.isActive) // muestra solo activas
            .map((cliente) => (
              <RecomendacionCard
                key={cliente.id}
                profile={cliente.profile}
                description={cliente.description}
              />
            ))}
        </div>

        {/* ✍ Formulario de nueva recomendación si el usuario está logueado */}
        {user ? (
          <div className="max-w-2xl mx-auto mt-10 bg-sky-50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-sky-700 mb-4">
              Deja tu recomendación
            </h2>
            <Textarea
              value={nuevaResena}
              onChange={(e) => setNuevaResena(e.target.value)}
              placeholder="Escribe tu recomendación aquí..."
              className="mb-4"
            />
            <Button onClick={enviarResena} disabled={loading}>
              {loading ? "Enviando..." : "Enviar recomendación"}
            </Button>
          </div>
        ) : (
          // 🔒 Bloque para usuarios no autenticados
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
