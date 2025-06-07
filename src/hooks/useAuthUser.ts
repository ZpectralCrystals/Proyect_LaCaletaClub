import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { UserData } from "@/types/types";

/**
 * 🧠 Hook personalizado para acceder al usuario autenticado desde Redux
 * Garantiza tipado estricto y evita repetir useSelector en múltiples componentes
 */
export const useAuthUser = (): UserData | null => {
  return useSelector((state: RootState) => state.auth.user) as UserData | null;
};
