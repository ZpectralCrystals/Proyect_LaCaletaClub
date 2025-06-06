import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        images={["portada1.png", "portada2.jpg", "portada3.jpeg"]}
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

      {/* PRODUCTOS DESTACADOS CON SWIPER */}
      <section className="bg-sky-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-sky-800 mb-8 text-center">
            Productos Destacados
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              modules={[Autoplay, Navigation, Pagination]}
              className="!overflow-visible"
            >
              {productosDestacados.map((p) => (
                <SwiperSlide key={p.id}>
                  <div className="w-full bg-white border border-sky-200 shadow-md hover:shadow-lg rounded-xl overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-semibold text-sky-800 mb-2">
                        {p.name}
                      </h3>
                      <button className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-full font-semibold transition">
                        Ver más
                      </button>
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
        <Link to="/register">
          <button className="bg-white text-sky-700 font-bold px-6 py-3 rounded-full hover:bg-blue-100 transition-all">
            Registrarme
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Inicio;
