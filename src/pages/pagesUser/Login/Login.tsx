import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser, setError, setLoading } from '@/store/authSlice';
import type { AppDispatch } from '@/store';
import type { User } from '@/store/authSlice';
const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Obtener rol desde tabla profiles
      const { data: profileData, error: profileError } = await supabase
  .from('profiles')
  .select('role, first_name, last_name')
  .eq('id', data.user?.id)
  .single();


      if (profileError) throw profileError;

      const userData: User = {
  id: data.user!.id,
  email: data.user!.email!,
  role: Number(profileData.role),
  first_name: profileData.first_name || '',
  last_name: profileData.last_name || '',
};


dispatch(setUser(userData));

      setMessage(`Bienvenido ${data.user!.email}`);
      // Redirigir según rol
      if ([2, 3, 4, 5].includes(userData.role)) {
  navigate('/admin/');
} else if (userData.role === 1) {
  navigate('/');
} else {
  navigate('/unauthorized');
}

    } catch (error: any) {
      dispatch(setError(error.message || 'Error al iniciar sesión'));
      setMessage(error.message || 'Error al iniciar sesión');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Iniciar sesión
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
