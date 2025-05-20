import { Link } from "react-router-dom";

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

      {/* CTA */}
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
