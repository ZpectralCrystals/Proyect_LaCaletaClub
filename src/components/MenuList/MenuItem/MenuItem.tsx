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
      className="w-52 h-[340px] [perspective:1000px] m-4"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full bg-white border rounded-md shadow-sm text-center font-sans [backface-visibility:hidden]">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-t-md"
            />
            <div className="absolute bottom-0 right-0 bg-sky-600 text-white px-2 py-1 text-sm font-semibold shadow-md rounded-tl-lg">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <h3 className="text-sky-800 text-lg font-semibold mt-2">{product.name}</h3>

          {/* Contador */}
          <div className="flex justify-center items-center mt-3 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                decrement();
              }}
              className="bg-red-500 text-white w-6 h-6 rounded-full"
            >
              –
            </button>
            <span className="text-sm font-bold">{quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                increment();
              }}
              className="bg-green-500 text-white w-6 h-6 rounded-full"
            >
              +
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2 px-3">(Haz clic para ver más)</p>
        </div>

        {/* Reverso */}
        <div className="absolute w-full h-full bg-white border rounded-md shadow-sm text-center font-sans p-3 overflow-y-auto [backface-visibility:hidden] rotate-y-180">
          <h3 className="text-sky-800 text-base font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>

          {product.varietyOptions.length > 0 && (
            <div className="text-xs text-gray-500 mb-2">
              <strong>Opciones:</strong> {product.varietyOptions.join(", ")}
            </div>
          )}

          <div className="text-xs text-sky-700 font-medium">
            <strong>Categoría:</strong> {categoryMap[product.type] || "Sin categoría"}
          </div>

          <p className="text-xs text-gray-400 mt-3">(Haz clic para volver)</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
