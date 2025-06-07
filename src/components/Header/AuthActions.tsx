import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faRightFromBracket,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

import type { UserData } from "@/types/types";

// ✅ Props esperadas: usuario autenticado y función para cerrar sesión
interface AuthActionsProps {
  user: UserData | null;
  onLogout: () => void;
}

/**
 * 🔐 AuthActions
 * Muestra los enlaces de login, perfil o panel según el estado de autenticación.
 */
export default function AuthActions({ user, onLogout }: AuthActionsProps) {
  if (!user) {
    // 🔓 Usuario no autenticado
    return (
      <>
        <Link to="/login" className="flex items-center gap-1 hover:underline">
          <FontAwesomeIcon icon={faRightToBracket} />
          Inicia Sesión
        </Link>
        <Link to="/register" className="flex items-center gap-1 hover:underline">
          <FontAwesomeIcon icon={faRightToBracket} className="rotate-180" />
          Regístrate
        </Link>
      </>
    );
  }

  // ✅ Usuario autenticado
  return (
    <>
      <span className="text-sm text-blue-100">
        Hola, <strong>{user.first_name} {user.last_name}</strong>
      </span>

      {[2, 3, 4, 5].includes(user.role) && (
        <Link
          to="/admin/"
          className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FontAwesomeIcon icon={faUserShield} />
          Panel
        </Link>
      )}

      {user.role === 1 && (
        <Link
          to="/profile"
          className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FontAwesomeIcon icon={faUserShield} />
          Perfil
        </Link>
      )}

      {/* 🔒 Botón para cerrar sesión */}
      <button
        onClick={onLogout}
        className="flex items-center gap-1 text-red-400 hover:text-red-600"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        Cerrar sesión
      </button>
    </>
  );
}
