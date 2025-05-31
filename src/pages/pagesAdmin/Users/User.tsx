import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface UserAdmin {
  id: string;
  email: string;
  role: number;
  first_name: string;
  last_name: string;
  dni: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<UserAdmin, 'id'>>({
    email: '',
    role: 1,
    first_name: '',
    last_name: '',
    dni: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Cargar usuarios desde Supabase
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from<UserAdmin>('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Agregar nuevo usuario
  const handleAdd = async () => {
    setLoading(true);
    setError(null);
    try {
      // Insertar usuario
      const { data, error } = await supabase.from('profiles').insert([
        {
          email: formData.email,
          role: formData.role,
          first_name: formData.first_name,
          last_name: formData.last_name,
          dni: formData.dni,
        },
      ]);

      if (error) throw error;
      if (data) {
        setUsers(prev => [...prev, data[0]]);
        resetForm();
      }
    } catch (err: any) {
      setError(err.message || 'Error al agregar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Editar usuario
  const handleEdit = (user: UserAdmin) => {
    setFormData({
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      dni: user.dni,
    });
    setEditingId(user.id);
  };

  // Guardar cambios de edición
  const handleUpdate = async () => {
    if (!editingId) return;

    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          email: formData.email,
          role: formData.role,
          first_name: formData.first_name,
          last_name: formData.last_name,
          dni: formData.dni,
        })
        .eq('id', editingId)
        .select();

      if (error) throw error;
      if (data) {
        setUsers(prev => prev.map(u => (u.id === editingId ? data[0] : u)));
        resetForm();
        setEditingId(null);
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;

    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Reset formulario
  const resetForm = () => {
    setFormData({
      email: '',
      role: 1,
      first_name: '',
      last_name: '',
      dni: '',
    });
    setEditingId(null);
  };

  // Manejar submit del formulario (agregar o editar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Gestión de Usuarios</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Nombres"
          required
          style={{ padding: 8, marginRight: 8 }}
        />
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Apellidos"
          required
          style={{ padding: 8, marginRight: 8 }}
        />
        <input
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          placeholder="DNI"
          required
          style={{ padding: 8, marginRight: 8 }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ padding: 8, marginRight: 8 }}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ padding: 8, marginRight: 8 }}
        >
          <option value={1}>Usuario</option>
          <option value={2}>Administrador</option>
        </select>

        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {editingId ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: 8, padding: '8px 16px' }}
            disabled={loading}
          >
            Cancelar
          </button>
        )}
      </form>

      {loading && <p>Cargando...</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Nombres</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Apellidos</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>DNI</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Rol</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: 10 }}>
                No hay usuarios.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.first_name}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.last_name}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.dni}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {user.role === 1 ? 'Usuario' : 'Administrador'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  <button onClick={() => handleEdit(user)} disabled={loading} style={{ marginRight: 8 }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user.id)} disabled={loading} style={{ color: 'red' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
