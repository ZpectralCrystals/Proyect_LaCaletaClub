import { Link } from "react-router-dom";

const productosDestacados = [
  {
    id: 1,
    nombre: "Ceviche Clásico",
    imagen: "/menu-img1.jpg",
    precio: 32,
  },
  {
    id: 2,
    nombre: "Tiradito 4 Continentes",
    imagen: "/menu-img2.jpg",
    precio: 45,
  },
  {
    id: 3,
    nombre: "Piqueo Caliente",
    imagen: "/menu-img3.jpg",
    precio: 70,
  },
  {
    id: 4,
    nombre: "Jugo de Maracuyá",
    imagen: "/menu-img4.jpg",
    precio: 10,
  },
  {
    id: 5,
    nombre: "Cusqueña",
    imagen: "/menu-img5.jpg",
    precio: 12,
  },
];

const Inicio = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
      <section className="relative bg-[url('/slider-bg2.jpg')] bg-cover bg-center min-h-[80vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Sabor Marino Auténtico</h1>
          <p className="text-xl mb-6">Bienvenido a CevicheClub — donde el ceviche se convierte en experiencia</p>
          <Link to="/menu">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full shadow-lg">
              Ver el Menú
            </button>
          </Link>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl text-sky-600">🐟</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Ceviches</h3>
            <p className="text-sm text-gray-600 mt-1">Tradicionales, mixtos y con crema especial La Caleta</p>
          </div>
          <div>
            <span className="text-4xl text-sky-600">🍽️</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Tiraditos</h3>
            <p className="text-sm text-gray-600 mt-1">Desde ají mirasol hasta 4 continentes</p>
          </div>
          <div>
            <span className="text-4xl text-sky-600">🦐</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Especiales</h3>
            <p className="text-sm text-gray-600 mt-1">Piqueos y combinados para compartir</p>
          </div>
          <div>
            <span className="text-4xl text-sky-600">🍹</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Bebidas</h3>
            <p className="text-sm text-gray-600 mt-1">Desde chicha morada hasta pisco sour</p>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS HORIZONTALES */}
      <section className="bg-sky-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-sky-800 mb-8 text-center">
            Productos Destacados
          </h2>

          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 w-max">
              {productosDestacados.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-sky-200 shadow-md hover:shadow-lg rounded-xl overflow-hidden relative w-[260px] flex-shrink-0 transition-all"
                >
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-sky-800 mb-2">
                      {p.nombre}
                    </h3>
                    <button className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-full font-semibold transition">
                      Ver más
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 bg-sky-600 text-white px-2 py-1 text-sm font-semibold shadow-md rounded-bl-lg">
                    S/ {p.precio.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA FINAL */}
      <section className="bg-sky-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">¡Únete a la experiencia CevicheClub!</h2>
        <p className="mb-6">Disfruta del mejor sabor marino y acumula puntos por cada visita.</p>
        <Link to="/registro">
          <button className="bg-white text-sky-700 font-bold px-6 py-3 rounded-full hover:bg-blue-100 transition-all">
            Registrarme
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Inicio;

