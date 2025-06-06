import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
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

// Definir el tipo UserAdmin
interface UserAdmin {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  points: number;
}

export default function UserAdminPage() {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados para el diálogo de crear/editar
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserAdmin | null>(null);

  // Campos del formulario
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [points, setPoints] = useState<number>(0);

  // Cargar usuarios
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      toast.error('Error cargando usuarios');
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Abrir modal de crear nuevo usuario
  

  // Abrir modal de editar usuario
  const openEditDialog = (user: UserAdmin) => {
    setEditUser(user);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setDni(user.dni);
    setPoints(user.points);
    setIsDialogOpen(true);
  };

  // Guardar usuario (crear o editar)
  const handleSave = async () => {
    if (!firstName || !lastName || !dni) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const payload = { points };

    if (editUser) {
      // Solo se permite editar los puntos
      const { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', editUser.id);

      if (error) {
        toast.error('Error actualizando puntos');
      } else {
        toast.success('Puntos actualizados');
        fetchUsers();
        setIsDialogOpen(false);
      }
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
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No hay usuarios.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{user.first_name}</td>
                <td className="border border-gray-300 p-2">{user.last_name}</td>
                <td className="border border-gray-300 p-2">{user.dni}</td>
                <td className="border border-gray-300 p-2">{user.points}</td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Dialog Crear / Editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Input
              placeholder="Nombres"
              value={firstName}
              disabled
            />
            <Input
              placeholder="Apellidos"
              value={lastName}
              disabled
            />
            <Input
              placeholder="DNI"
              value={dni}
              disabled
            />
            <Input
              type="number"
              placeholder="Puntos"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>{editUser ? 'Actualizar' : 'Crear'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
