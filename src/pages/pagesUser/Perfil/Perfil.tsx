import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toaster, toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UserAdmin {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  puntos: number;
}

export default function UserAdminPage() {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserAdmin | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [points, setPoints] = useState<number>(0);

  const API_URL = 'http://localhost:8000/api/auth/profiles/';
  const PUNTOS_URL = 'http://127.0.0.1:8000/api/auth/user/puntos/';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`,
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers });
      const data = await res.json();
      console.log('Usuarios actualizados:', data);
      setUsers(data);
    } catch (err) {
      toast.error('Error cargando usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPoints = async (userId: string) => {
    try {
      const res = await fetch(`${PUNTOS_URL}${userId}/`, { headers });
      const data = await res.json();
      if (data && data.puntos !== undefined) {
        setPoints(data.puntos);
      } else {
        setPoints(0); // Asignamos 0 si no se encuentra la propiedad puntos
      }
    } catch (error) {
      console.error('Error obteniendo puntos del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditDialog = (user: UserAdmin) => {
    setEditUser(user);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setDni(user.dni);
    setPoints(user.puntos); // Asignamos los puntos del usuario al abrir el modal
    setIsDialogOpen(true);
    fetchUserPoints(user.id); // Obtenemos los puntos desde la API
  };

  const handleSave = async () => {
  if (!editUser) return;

  try {
    const res = await fetch(`${API_URL}${editUser.id}/`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ puntos: points }),
    });

    if (!res.ok) throw new Error();

    toast.success('Puntos actualizados');
    setIsDialogOpen(false);

    // Actualizamos los puntos del usuario directamente en el frontend
    setUsers((prevUsers) => 
      prevUsers.map((user) => 
        user.id === editUser.id ? { ...user, puntos: points } : user
      )
    );
    
    console.log('Guardado:', res.status);
  } catch {
    toast.error('Error actualizando puntos');
  }
};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-2xl mb-6">Gestión de Usuarios</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Apellido</th>
              <th className="border border-gray-300 p-2">DNI</th>
              <th className="border border-gray-300 p-2">Puntos</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">No hay usuarios.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{user.first_name}</td>
                  <td className="border border-gray-300 p-2">{user.last_name}</td>
                  <td className="border border-gray-300 p-2">{user.dni}</td>
                  <td key={`${user.id}-${user.puntos}`} className="border border-gray-300 p-2">{user.puntos}</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Input placeholder="Nombres" value={firstName} disabled />
            <Input placeholder="Apellidos" value={lastName} disabled />
            <Input placeholder="DNI" value={dni} disabled />
            <Input
              type="number"
              placeholder="Puntos"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Actualizar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
