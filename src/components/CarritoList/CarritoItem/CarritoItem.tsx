import React from "react";

interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  description: string;
  image: string;
  varietyOptions: string[];
  isActive: boolean;
}

interface Props {
  product: Product;
  categoryMap: Record<number, string>; // Nuevo: para mostrar el nombre del tipo
}

const CarritoItem: React.FC<Props> = ({ product, categoryMap }) => {
  if (!product.isActive) return null; // No mostrar productos desactivados

  return (
    <div className="w-52 border rounded-md shadow-sm bg-white text-center relative font-sans m-4">
      {/* Badge superior derecha con tipo */}
      <div className="absolute top-0 right-0 rotate-45 bg-white text-red-700 text-xs font-bold px-2 shadow-sm z-10">
        {categoryMap[product.type] || "Sin categoría"}
      </div>

      {/* Imagen */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto"
        />

        {/* Precio */}
        <div className="absolute bottom-0 right-0 bg-green-600 text-white text-sm font-bold px-2 py-1 rounded-bl-md">
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* Nombre */}
      <h3 className="text-yellow-800 text-base font-semibold mt-3">
        {product.name}
      </h3>

      {/* Descripción */}
      <p className="text-gray-600 text-xs px-2 mb-2">{product.description}</p>

      {/* Opciones de variedad */}
      {product.varietyOptions.length > 0 && (
        <div className="text-xs text-gray-500 mb-2 px-2">
          Opciones: {product.varietyOptions.join(", ")}
        </div>
      )}

      {/* Botón */}
      <button className="bg-gradient-to-b from-yellow-300 to-yellow-500 text-white font-semibold py-2 px-4 rounded-full mb-4 hover:from-yellow-400 hover:to-yellow-600 transition">
        Agregar al Carrito
      </button>
    </div>
  );
};

export default CarritoItem;
