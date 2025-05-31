import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HeroSliderProps {
  images: string[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  interval?: number;
}

const HeroSlider = ({
  images,
  title = "Sabor Marino Auténtico",
  subtitle = "Bienvenido a CevicheClub — donde el ceviche se convierte en experiencia",
  ctaText = "Ver el Menú",
  ctaLink = "/menu",
  interval = 5000,
}: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(autoSlide);
  }, [images.length, interval]);

  const goTo = (index: number) => setCurrent(index);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-blue-900/60 z-10" />

      {/* Controles siguiente/anterior */}
      <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={prev}
          className="bg-white/30 hover:bg-white/60 text-white font-bold rounded-full p-2 text-2xl"
        >
          ‹
        </button>
      </div>
      <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={next}
          className="bg-white/30 hover:bg-white/60 text-white font-bold rounded-full p-2 text-2xl"
        >
          ›
        </button>
      </div>

      {/* Contenido */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{title}</h1>
        <p className="text-xl mb-6">{subtitle}</p>
        <Link to={ctaLink}>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full shadow-lg">
            {ctaText}
          </button>
        </Link>

        {/* Indicadores */}
        <div className="mt-8 flex justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
