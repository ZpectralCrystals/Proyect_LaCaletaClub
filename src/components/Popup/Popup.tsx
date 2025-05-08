import React, { useState, useEffect } from "react";

interface Anuncio {
  id: number;
  titulo: string;
  mensaje: string;
  imagen: string;
  activo: boolean;
}

const Popup: React.FC = () => {
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);

  useEffect(() => {
    
    fetch("/anuncios.json")
      .then((response) => response.json())
      .then((data) => {
        
        const activeAnuncio = data.find((item: Anuncio) => item.activo === true);
        setAnuncio(activeAnuncio || null); 
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  const closePopup = () => {
    setAnuncio(null); 
  };

  if (!anuncio) {
    return null; 
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative text-center shadow-lg">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-700"
        >
          &times;
        </button>
        <img
          src={anuncio.imagen}
          alt={anuncio.titulo}
          className="w-full h-auto rounded mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{anuncio.titulo}</h2>
        <p className="text-sm mb-4">{anuncio.mensaje}</p>
        <button
          onClick={closePopup}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Más Información
        </button>
      </div>
    </div>
  );
};

export default Popup;
