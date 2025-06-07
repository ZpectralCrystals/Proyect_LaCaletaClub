import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { addToCart } from "@/redux/cartSlice";
// 📦 Tipado del producto
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
// 📦 Props que recibe el componente
interface Props {
  product: Product;
  categoryMap: Record<number, string>; // Mapea el ID de categoría al nombre
}
/**
 * 🍽️ Componente de tarjeta individual del menú
 * - Muestra info del producto (nombre, precio, imagen)
 * - Tiene efecto de flip para mostrar descripción y opciones
 * - Permite seleccionar cantidad y agregar al carrito
 */
const MenuItem: React.FC<Props> = ({ product, categoryMap }) => {
  const [flipped, setFlipped] = useState(false);     // 🌀 Estado para voltear la tarjeta
  const [quantity, setQuantity] = useState(0);       // 🔢 Cantidad seleccionada
  const dispatch = useDispatch<AppDispatch>();
  // ❌ Si el producto está inactivo, no lo mostramos
  if (!product.isActive) return null;
  // 🔄 Voltear la tarjeta
  const handleFlip = () => setFlipped(!flipped);
  // ➕ Incrementar cantidad
  const increment = () => setQuantity((q) => q + 1);
  // ➖ Disminuir cantidad (nunca menor a 0)
  const decrement = () => setQuantity((q) => Math.max(0, q - 1));
  // 🛒 Agregar al carrito (despacha Redux)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita voltear al hacer clic en botón
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        })
      );
      setQuantity(0); // Reinicia cantidad tras agregar
    }
  };
  return (
    <div
      className="relative w-full min-h-[400px] sm:h-[400px] [perspective:1000px] cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ✅ Lado frontal: imagen, precio, controles */}
        <div className="absolute w-full h-full bg-white border border-gray-200 rounded-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 [backface-visibility:hidden]">
          <div className="w-full flex justify-center relative mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
            />
          </div>
          <h3 className="text-center text-base sm:text-lg font-semibold text-sky-800 mt-2 sm:mt-4">
            {product.name}
          </h3>
          <p className="text-sky-600 text-sm sm:text-base font-medium mt-1">
            S/ {product.price.toFixed(2)}
          </p>
          {/* 🔢 Controles de cantidad */}
          <div
            className="flex justify-center items-center gap-3 my-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={decrement}
              className="bg-white text-sky-600 w-7 h-7 rounded-full border"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <span className="text-sm font-bold">{quantity}</span>
            <button
              onClick={increment}
              className="bg-white text-sky-600 w-7 h-7 rounded-full border"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>

          {/* 🛒 Botón agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-1.5 text-sm rounded-full flex items-center gap-2 disabled:opacity-50"
            disabled={quantity === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>
          <p className="text-xs text-gray-400 mt-3 sm:mt-4">(Haz clic para ver más)</p>
        </div>
        {/* 🔁 Lado trasero: descripción y opciones */}
        <div className="absolute w-full h-full bg-white border border-gray-200 rounded-md p-4 overflow-auto [backface-visibility:hidden] rotate-y-180">
          <h3 className="text-sky-800 text-base font-semibold mb-2">
            {product.name}
          </h3>
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
