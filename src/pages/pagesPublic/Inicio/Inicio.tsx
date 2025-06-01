import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";
import HeroSlider from "@/components/HeroSlider/HeroSlider";


interface Producto {
  id: number;
  name: string;
  type: number;
  price: number;
  description: string;
  image: string;
  varietyOptions: string[];
  isActive: boolean;
  isFavorite: boolean;
}

const Inicio = () => {
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  // Map de categorías si las necesitas aquí (de lo contrario puedes importarlo o pasarlo como prop)
  const categoryMap: Record<number, string> = {
    1: "Ceviches",
    2: "Tiraditos",
    3: "Piqueos",
    4: "Bebidas",
    5: "Postres",
  };

  useEffect(() => {
    const fetchProductosDestacados = async () => {
      const { data, error } = await supabase
        .from("productostab")
        .select("*")
        .eq("isFavorite", true)
        .eq("isActive", true);

      if (error) {
        console.error("Error al cargar productos destacados:", error);
      } else {
        setProductosDestacados(data);
      }

      setLoading(false);
    };

    fetchProductosDestacados();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <HeroSlider
        images={["/portada1.png", "/portada2.png", "/portada3.png"]}
        title="Sabor Marino Auténtico"
        subtitle="Bienvenido a CevicheClub — donde el ceviche se convierte en experiencia"
        ctaText="Ver el Menú"
        ctaLink="/menu"
      />

      {/* DESTACADOS INFO CATEGORIES */}
      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl text-sky-600">🐟</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Ceviches</h3>
            <p className="text-sm text-gray-600 mt-1">
              Tradicionales, mixtos y con crema especial La Caleta
            </p>
          </div>
          <div>
            <span className="text-4xl text-sky-600">🍽️</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Tiraditos</h3>
            <p className="text-sm text-gray-600 mt-1">
              Desde ají mirasol hasta 4 continentes
            </p>
          </div>
          <div>
            <span className="text-4xl text-sky-600">🦐</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Especiales</h3>
            <p className="text-sm text-gray-600 mt-1">
              Piqueos y combinados para compartir
            </p>
          </div>
          <div>
            <span className="text-4xl text-sky-600">🍹</span>
            <h3 className="text-lg font-semibold mt-2 text-sky-800">Bebidas</h3>
            <p className="text-sm text-gray-600 mt-1">
              Desde chicha morada hasta pisco sour
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
   <section className="bg-sky-50 py-16 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold text-sky-800 mb-8 text-center">
      Productos Destacados
    </h2>

    {loading ? (
      <p className="text-center text-sky-600">Cargando...</p>
    ) : (
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {productosDestacados.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="bg-white border border-sky-200 shadow-md hover:shadow-lg rounded-xl overflow-hidden relative w-full">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-sky-800 mb-2">
                  {p.name}
                </h3>
              </div>
              <div className="absolute top-0 right-0 bg-sky-600 text-white px-2 py-1 text-sm font-semibold shadow-md rounded-bl-lg">
                S/ {p.price.toFixed(2)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </div>
</section>
      {/* CTA FINAL */}
      <section className="bg-sky-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">¡Únete a la experiencia CevicheClub!</h2>
        <p className="mb-6">
          Disfruta del mejor sabor marino y acumula puntos por cada visita.
        </p>
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
