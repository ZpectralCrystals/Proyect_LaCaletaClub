import { useState } from "react";

const sedes = {
  "Umacollo": "51913204134",
  "Lambramani": "51913204168",
  "Cerro Colorado": "51977928716",
};

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    mensaje: "",
    sede: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numeroWhatsApp = sedes[formulario.sede as keyof typeof sedes];
    const texto = `👤 Nombre: ${formulario.nombre}
📞 Teléfono: ${formulario.telefono}
📍 Sede: ${formulario.sede}
✉️ Mensaje: ${formulario.mensaje}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 text-center mb-10">Contáctanos</h1>

        {/* Información de sedes */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-sky-900">
          <div>
            <h3 className="font-bold">📍 Umacollo</h3>
            <p>Emmel G-4, frente al Estadio</p>
            <p>📲 913 204 134</p>
          </div>
          <div>
            <h3 className="font-bold">📍 Lambramani</h3>
            <p>Av. Lambramani B-2, a una cuadra del óvalo</p>
            <p>📲 913 204 168</p>
          </div>
          <div>
            <h3 className="font-bold">📍 Cerro Colorado</h3>
            <p>Av. Alfonso Ugarte 618-A, a dos cuadras de la Plaza Las Américas</p>
            <p>📲 977 928 716</p>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-50 p-6 rounded-xl shadow space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              className="p-3 rounded w-full border border-blue-200"
              value={formulario.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Tu teléfono"
              className="p-3 rounded w-full border border-blue-200"
              value={formulario.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="sede"
            value={formulario.sede}
            onChange={handleChange}
            className="p-3 rounded w-full border border-blue-200"
            required
          >
            <option value="">Selecciona una sede</option>
            <option value="Umacollo">📍 Umacollo</option>
            <option value="Lambramani">📍 Lambramani</option>
            <option value="Cerro Colorado">📍 Cerro Colorado</option>
          </select>

          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            className="p-3 rounded w-full border border-blue-200 min-h-[120px]"
            value={formulario.mensaje}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
          >
            Enviar por WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contacto;
