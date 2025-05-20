import { useState } from "react";

type SedeKey = "Umacollo" | "Lambramani" | "Cerro Colorado";

interface SedeInfo {
  direccion: string;
  telefono: string;
  mapa: string;
}

const sedes: Record<SedeKey, SedeInfo> = {
  Umacollo: {
    direccion: "Emmel G-4, frente al Estadio",
    telefono: "913204134",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15599.59506510208!2d-71.536!3d-16.395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a58d218d075%3A0x0!2sJF23%2B7C%20Yanahuara!5e0!3m2!1ses-419!2spe!4v1716061234567",
  },
  Lambramani: {
    direccion: "Av. Lambramani B-2, a una cuadra del óvalo",
    telefono: "913204168",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.780831783417!2d-71.54120068576835!3d-16.404720838510584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a7557f66ed7%3A0x1d2d97a66bd5b529!2sAv.%20Lambramani%20B-2%2C%20Arequipa!5e0!3m2!1ses-419!2pe!4v1687200000001",
  },
  "Cerro Colorado": {
    direccion: "Av. Alfonso Ugarte 618-A, a dos cuadras de la Plaza Las Américas",
    telefono: "977928716",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.9285409611277!2d-71.57150338576751!3d-16.460085238796883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b0183b36a3b%3A0x4e0e5e11093cd5e6!2sAv.%20Alfonso%20Ugarte%20618-A%2C%20Cerro%20Colorado!5e0!3m2!1ses-419!2pe!4v1687200000002",
  },
};

const Contacto = () => {
  const [sede, setSede] = useState<SedeKey>("Umacollo");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { direccion, telefono, mapa } = sedes[sede];

  const handleWhatsAppClick = () => {
    const text = `Hola CevicheClub 👋, me gustaría contactar con la sede *${sede}*.

🧑 Nombre: ${nombre}
📧 Correo: ${correo}
📝 Mensaje: ${mensaje}`;

    const url = `https://wa.me/51${telefono}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-8 text-center">Contáctanos</h1>

        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">Selecciona una sede</label>
              <select
                value={sede}
                onChange={(e) => setSede(e.target.value as SedeKey)}
                className="w-full border border-sky-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
              >
                <option value="Umacollo">📍 Umacollo</option>
                <option value="Lambramani">📍 Lambramani</option>
                <option value="Cerro Colorado">📍 Cerro Colorado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full border border-sky-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="w-full border border-sky-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mensaje</label>
              <textarea
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
                className="w-full border border-sky-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
              ></textarea>
            </div>
          </form>

          {/* Información de contacto */}
          <div className="space-y-4 text-sky-900">
            <p>
              📍 <strong>{sede}:</strong> {direccion}
            </p>
            <p>
              📞 <strong>Teléfono:</strong> +51 {telefono}
            </p>
           

            <button
              onClick={handleWhatsAppClick}
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              📲 Escribir por WhatsApp
            </button>
          </div>
        </section>

        {/* Mapa dinámico */}
        <div className="mt-10 rounded-xl overflow-hidden shadow-md">
          <iframe
            title={`Mapa sede ${sede}`}
            src={mapa}
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
            className="w-full border-0"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default Contacto;
