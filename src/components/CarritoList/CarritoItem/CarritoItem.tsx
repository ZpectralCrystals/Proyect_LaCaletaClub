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
  <div className="absolute top-6 right-0 rotate-45 bg-white text-red-700 text-xs font-bold px-2 shadow-sm z-10">
    {categoryMap[product.type] || "Sin categoría"}
  </div>

  {/* Imagen (puede ser reemplazada con emoji o ícono si lo deseas) */}
  <div className="relative">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-auto"
    />

    {/* Precio */}
    <div className="absolute bottom-0 right-0 bg-sky-600 text-white px-2 py-1 text-sm font-semibold shadow-md rounded-tl-lg">
      ${product.price.toFixed(2)}
    </div>
  </div>

  {/* Nombre con estilo 'sky' */}
  <h3 className="text-sky-800 text-lg font-semibold mt-3">
    {product.name}
  </h3>

  {/* Descripción con estilo claro */}
  <p className="text-gray-600 text-sm px-2 mt-1 mb-2">
    {product.description}
  </p>

  {/* Opciones de variedad */}
  {product.varietyOptions.length > 0 && (
    <div className="text-xs text-gray-500 mb-2 px-2">
      Opciones: {product.varietyOptions.join(", ")}
    </div>
  )}

  {/* Botón con tonos cálidos */}
  <button className=" bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 mb-3 rounded-full font-semibold transition">
    Agregar al Carrito
  </button>
</div>

  );
};

export default CarritoItem;
