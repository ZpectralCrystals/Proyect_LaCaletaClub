import { Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useState } from "react";

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
  categoryMap: Record<number, string>;
}

const MenuItem: React.FC<Props> = ({ product, categoryMap }) => {
  const [flipped, setFlipped] = useState(false);
  const [quantity, setQuantity] = useState(0);

  if (!product.isActive) return null;

  const handleFlip = () => setFlipped(!flipped);
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  return (
    <div
      className="relative w-full h-[380px] [perspective:1000px] cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full bg-white border border-gray-200 rounded-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 [backface-visibility:hidden]">
          <div className="w-full flex justify-center -mb-16 z-10 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-36 h-36 object-contain mb-12"
            />
          </div>

          <h3 className="text-center text-lg font-semibold text-sky-800 mt-6">
            {product.name}
          </h3>

          <p className="text-sky-600 text-sm font-medium mb-2">
            S/ {product.price.toFixed(2)}
          </p>

          <div
            className="flex justify-center items-center gap-2 my-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={decrement}
              className="bg-white text-sky-600 w-6 h-6 rounded-full border"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <span className="text-sm font-bold">{quantity}</span>
            <button
              onClick={increment}
              className="bg-white text-sky-600 w-6 h-6 rounded-full border"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>

          <button
            onClick={(e) => e.stopPropagation()}
            className="mt-2 bg-sky-700 hover:bg-sky-800 text-white px-4 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>

          <p className="text-xs text-gray-400 mt-2">(Haz clic para ver más)</p>
        </div>

        {/* Reverso */}
        <div className="absolute w-full h-full bg-white border border-gray-200 rounded-md p-4 overflow-y-auto [backface-visibility:hidden] rotate-y-180">
          <h3 className="text-sky-800 text-base font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>

          {product.varietyOptions.length > 0 && (
            <div className="text-xs text-gray-500 mb-2">
              <strong>Opciones:</strong> {product.varietyOptions.join(", ")}
            </div>
          )}

          <div className="text-xs text-sky-700 font-medium">
            <strong>Categoría:</strong> {categoryMap[product.type] || "Sin categoría"}
          </div>

          <p className="text-xs text-gray-400 mt-4">(Haz clic para volver)</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
