// hooks/useLogout.ts
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export function useLogout() {
  return async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      toast.success("Sesión cerrada correctamente");
      window.location.href = "/";
    }
  };
}
