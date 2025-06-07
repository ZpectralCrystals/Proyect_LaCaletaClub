import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { setUser } from '@/store/authSlice';
import type { AppDispatch } from '@/store';

/**
 * 🧠 SessionLoader
 * Este componente se monta una sola vez al iniciar la app.
 * Su propósito es:
 * - Consultar si hay una sesión activa en Supabase
 * - Si la hay, obtener el perfil del usuario desde la tabla `profiles`
 * - Guardar los datos en Redux mediante `setUser`
 */
const SessionLoader = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadSession = async () => {
      // 🔐 Consultamos sesión activa en Supabase
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session?.user) {
        // 👤 Si hay usuario logueado, consultamos su perfil personalizado
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role, first_name, last_name')
          .eq('id', session.user.id)
          .single();

        // ✅ Si el perfil existe, lo guardamos en Redux con estructura tipada
        if (!profileError && profileData) {
          dispatch(setUser({
            id: session.user.id,
            email: session.user.email!,
            role: Number(profileData.role),
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
          }));
        }
      }
    };

    loadSession(); // 🔄 Ejecutar al montar el componente
  }, [dispatch]);

  // ❌ No renderiza nada, sólo gestiona sesión en segundo plano
  return null;
};

export default SessionLoader;
