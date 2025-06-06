import { useNavigate } from "react-router-dom"; // Usamos useNavigate para redirigir
import { useSelector } from "react-redux"; // Usamos useSelector para acceder al estado de Redux
import { toast } from "sonner"; // Librería para mostrar toast
import { Button } from "@/components/ui/button";
// Definir el tipo de estado de usuario, asumiendo que tienes un estado en Redux
interface UserState {
  isAuthenticated: boolean;
}

const ProceedToPaymentButton = () => {
  const user = useSelector((state: { auth: { user: UserState } }) => state.auth.user); // Verifica el estado de autenticación
  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  const handlePaymentRedirect = () => {
    if (user) {
      // Si el usuario está logueado, redirigir a /carrito
      navigate("/carrito");
    } else {
      // Si el usuario no está logueado, mostrar un toast
      toast.error("Necesitas registrarte para proceder al pago");
    }
  };

  return (
    <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={handlePaymentRedirect}>
      Proceder al pago
    </Button>
  );
};

export default ProceedToPaymentButton;
