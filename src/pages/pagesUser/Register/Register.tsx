import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useDispatch } from 'react-redux';
import { setError, setLoading } from '@/store/authSlice';
import type { AppDispatch } from '@/store';
const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [dni, setDni] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    setMessage(null);

    if (!dni || !firstName || !lastName || !email || !password) {
      setMessage('Por favor completa todos los campos.');
      dispatch(setLoading(false));
      return;
    }

    try {
      // Crear usuario en auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      if (data.user) {
        // Insertar perfil con datos adicionales y rol = 1
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              dni,
              first_name: firstName,
              last_name: lastName,
              role: 1,
            },
          ]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Número de DNI"
          required
          value={dni}
          onChange={e => setDni(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
          maxLength={8}
          pattern="\d{8}"
          title="Ingrese un DNI válido de 8 dígitos"
        />
        <input
          type="text"
          placeholder="Nombres completos"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Apellidos completos"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
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
          minLength={6}
          title="La contraseña debe tener al menos 6 caracteres"
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Registrarse
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;