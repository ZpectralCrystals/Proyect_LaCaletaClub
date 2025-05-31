import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser, setError, setLoading } from '../../store/authSlice';
import type { AppDispatch } from '../../store';

const LoginRegister: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    setMessage(null);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      if (data.user) {
        // Insertar en tabla profiles con rol 1
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email: data.user.email, role: 1 }]);

        if (profileError) throw profileError;

        setMessage('Registrado correctamente. Revisa tu correo para confirmar.');
      }
    } catch (error: any) {
      dispatch(setError(error.message || 'Error al registrar'));
      setMessage(error.message || 'Error al registrar');
    } finally {
      dispatch(setLoading(false));
    }
  };

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
        .select('role')
        .eq('id', data.user?.id)
        .single();

      if (profileError) throw profileError;

      const userData = {
        id: data.user!.id,
        email: data.user!.email!,
        role: profileData.role,
      };

      dispatch(setUser(userData));
      setMessage(`Bienvenido ${data.user!.email}`);

      // Redirigir según rol
      if (userData.role === 1) {
        navigate('/');
      } else if (userData.role === 2) {
        navigate('/admin/');
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
    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isRegister ? 'Registro' : 'Login'}</h2>
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
          {isRegister ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>
      <p
        style={{ marginTop: 15, cursor: 'pointer', color: 'blue' }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginRegister;
