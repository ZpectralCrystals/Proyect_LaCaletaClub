// src/components/SessionLoader.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { setUser } from '@/store/authSlice';
import type { AppDispatch } from '@/store';

const SessionLoader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role, first_name, last_name')
          .eq('id', session.user.id)
          .single();

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

    loadSession();
  }, [dispatch]);

  return null; // no renderiza nada
};

export default SessionLoader;
