import { useEffect, useState } from "react";

interface Reseña {
  id: number;
  nombre: string;
  comentario: string;
  imagen: string;
}

const Recomendaciones = () => {
  const [resenas, setResenas] = useState<Reseña[]>([]);

  useEffect(() => {
    // Datos simulados de clientes
    const data: Reseña[] = [
      {
        id: 1,
        nombre: "María Fernández",
        comentario: "El mejor ceviche que he probado, fresco y delicioso. ¡Volveré seguro!",
        imagen: "/client1.jpg",
      },
      {
        id: 2,
        nombre: "Luis Rodríguez",
        comentario: "Me encantó el sistema de puntos. Comí rico y encima gané premios.",
        imagen: "/client2.jpg",
      },
      {
        id: 3,
        nombre: "Carla Gómez",
        comentario: "La atención fue increíble, y el tiradito estaba espectacular.",
        imagen: "/client3.jpg",
      },
    ];

    setResenas(data);
  }, []);

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Recomendaciones</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {resenas.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <img
                src={cliente.imagen}
                alt={cliente.nombre}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-sky-200"
              />
              <h3 className="text-lg font-semibold text-sky-700">{cliente.nombre}</h3>
              <p className="text-gray-700 mt-2 text-sm">“{cliente.comentario}”</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Recomendaciones;
