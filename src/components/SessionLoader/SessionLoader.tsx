import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import { AppDispatch } from '@/store';

/**
 * 🧠 SessionLoader
 * Este componente se monta una sola vez al iniciar la app.
 * Su propósito es:
 * - Consultar si hay una sesión activa en Django usando el token JWT
 * - Si la hay, obtener el perfil del usuario desde la API de Django
 * - Guardar los datos en Redux mediante `setUser`
 */
const SessionLoader = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadSession = async () => {
      // 🔐 Consultamos la sesión activa en Django con el JWT
      const token = localStorage.getItem('access');  // Recuperamos el token JWT

      if (token) {
        try {
          // Hacemos una solicitud a la API de Django para obtener el perfil
          const res = await fetch('http://localhost:8000/api/auth/me/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error('Error al obtener los datos del perfil');
          }

          const profileData = await res.json();

          // ✅ Si el perfil existe, lo guardamos en Redux con la estructura tipada
          dispatch(setUser({
            id: profileData.id,
            email: profileData.email,
            role: profileData.role,
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
          }));
        } catch (error) {
          console.error('Error cargando la sesión:', error);
        }
      }
    };

    loadSession(); // 🔄 Ejecutar al montar el componente
  }, [dispatch]);

  // ❌ No renderiza nada, sólo gestiona sesión en segundo plano
  return null;
};

export default SessionLoader;
