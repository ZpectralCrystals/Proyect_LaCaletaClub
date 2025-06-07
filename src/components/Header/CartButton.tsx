import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// ✅ Props esperadas por el componente
interface CartButtonProps {
  totalPrice: number;     // Total en soles del carrito
  onClick: () => void;    // Función que se ejecuta al hacer clic (abrir carrito)
}
/**
 * 🛒 CartButton
 * Este componente representa el botón del carrito de compras en el header.
 * Muestra el ícono y el total acumulado en formato S/.
 * Se recomienda usarlo dentro de un header fijo o barra de navegación.
 */
export default function CartButton({ totalPrice, onClick }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 hover:opacity-80 transition"
      aria-label="Abrir carrito"
    >
      {/* Icono del carrito */}
      <FontAwesomeIcon icon={faCartShopping} />
      {/* Total de la compra en soles, con 2 decimales */}
      <span className="text-sm font-semibold">
        S/ {totalPrice.toFixed(2)}
      </span>
    </button>
  );
}
