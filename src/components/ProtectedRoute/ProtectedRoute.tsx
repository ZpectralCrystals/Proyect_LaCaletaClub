import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'; // ✅ Tipado global del estado de Redux
import type { UserData } from '@/types/types'; // ✅ Tipado del usuario autenticado

// ✅ Props que acepta este componente:
// - children: componente protegido (por ejemplo, una página)
// - allowedRoles: lista de roles que tienen acceso
interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: number[];
}

// ✅ Componente que protege rutas según el rol del usuario
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  // 🔍 Obtenemos el usuario desde Redux y le aplicamos tipado explícito
  const user = useSelector((state: RootState) => state.auth.user) as UserData | null;

  // 🚫 Si no hay usuario logueado o su rol no está definido, redirigir al login
  if (!user || typeof user.role !== 'number') {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Si el usuario no tiene el rol permitido, redirigir a la página no autorizada
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Si todo está bien, se renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
