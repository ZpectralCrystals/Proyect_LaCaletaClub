import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ✅ Tipado de las props que recibe el componente
interface HeroSliderProps {
  images: string[];        // Lista de URLs de imágenes para el slider
  title?: string;          // Título principal opcional
  subtitle?: string;       // Subtítulo opcional
  ctaText?: string;        // Texto del botón de acción (ej: "Ver menú")
  ctaLink?: string;        // Ruta del botón de acción
  interval?: number;       // Intervalo de cambio automático en milisegundos
}

// 🧭 Componente de Hero con slider de fondo y contenido promocional
const HeroSlider = ({
  images,
  title = "Sabor Marino Auténtico",
  subtitle = "Bienvenido a CevicheClub — donde el ceviche se convierte en experiencia",
  ctaText = "Ver el Menú",
  ctaLink = "/menu",
  interval = 5000,
}: HeroSliderProps) => {
  // 🔄 Índice actual del slider
  const [current, setCurrent] = useState(0);

  // ⏱️ Cambiar automáticamente de imagen cada "interval" milisegundos
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    // 🔚 Limpieza del intervalo al desmontar componente
    return () => clearInterval(autoSlide);
  }, [images.length, interval]);

  // 🔁 Funciones auxiliares
  const goTo = (index: number) => setCurrent(index); // Ir a una imagen específica
  const next = () => setCurrent((prev) => (prev + 1) % images.length); // Imagen siguiente
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length); // Imagen anterior

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* 🔄 Renderiza las imágenes del slider como fondos */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* 🌓 Superposición semitransparente oscura para mejorar contraste */}
      <div className="absolute inset-0 bg-blue-900/60 z-10" />

      {/* ⬅ Botón anterior (solo visible en pantallas md+) */}
      <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={prev}
          className="bg-white/30 hover:bg-white/60 text-white font-bold rounded-full p-2 text-2xl"
          aria-label="Anterior"
        >
          ‹
        </button>
      </div>

      {/* ➡ Botón siguiente (solo visible en pantallas md+) */}
      <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={next}
          className="bg-white/30 hover:bg-white/60 text-white font-bold rounded-full p-2 text-2xl"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      {/* 💬 Contenido textual encima del slider */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{title}</h1>
        <p className="text-xl mb-6">{subtitle}</p>

        {/* ✅ Botones de acción: "Ver menú" + "Regístrate" */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={ctaLink}>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full shadow-lg">
              {ctaText}
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-white hover:bg-gray-100 text-sky-700 font-bold px-6 py-3 rounded-full shadow-lg">
              Regístrate
            </button>
          </Link>
        </div>

        {/* 🔘 Indicadores de posición actual del slider */}
        <div className="mt-8 flex justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
