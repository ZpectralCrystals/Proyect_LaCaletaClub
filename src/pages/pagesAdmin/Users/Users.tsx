import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toaster, toast } from 'sonner';

interface UserAdmin {
  id: string;
  email: string;
  role: number;
  first_name: string;
  last_name: string;
  dni: string;
}

export default function UserAdminPage() {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados para dialogo de crear/editar
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserAdmin | null>(null);

  // Estados para eliminar
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Campos formulario
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');

  // Cargar usuarios
  const fetchUsers = async () => {
    setLoading(true);
   const { data, error } = await supabase
  .from('profiles')
  .select('*');

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

  // Abrir modal crear nuevo usuario
  const openCreateDialog = () => {
    setEditUser(null);
    setEmail('');
    setRole(1);
    setFirstName('');
    setLastName('');
    setDni('');
    setIsDialogOpen(true);
  };

  // Abrir modal editar usuario
  const openEditDialog = (user: UserAdmin) => {
    setEditUser(user);
    setEmail(user.email);
    setRole(user.role);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setDni(user.dni);
    setIsDialogOpen(true);
  };

  // Guardar usuario (crear o editar)
  const handleSave = async () => {
    if (!email || !firstName || !lastName || !dni) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const payload = {
      email,
      role,
      first_name: firstName,
      last_name: lastName,
      dni,
    };

    if (editUser) {
      // Editar
      const { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', editUser.id);

      if (error) {
        toast.error('Error actualizando usuario');
      } else {
        toast.success('Usuario actualizado');
        fetchUsers();
        setIsDialogOpen(false);
      }
    } else {
      // Crear
      // Nota: aquí solo insertamos en profiles, sin creación auth.user real
      const { error } = await supabase.from('profiles').insert([payload]);
      if (error) {
        toast.error('Error creando usuario');
      } else {
        toast.success('Usuario creado');
        fetchUsers();
        setIsDialogOpen(false);
      }
    }
  };

  // Confirmar eliminar usuario
  const handleDelete = async () => {
    if (!deleteUserId) return;

    const { error } = await supabase.from('profiles').delete().eq('id', deleteUserId);
    if (error) {
      toast.error('Error eliminando usuario');
    } else {
      toast.success('Usuario eliminado');
      fetchUsers();
    }
    setIsAlertOpen(false);
    setDeleteUserId(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-2xl mb-6">Gestión de Usuarios</h1>

      <Button onClick={openCreateDialog} className="mb-4">
        Crear Nuevo Usuario
      </Button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Apellido</th>
              <th className="border border-gray-300 p-2">DNI</th>
              <th className="border border-gray-300 p-2">Rol</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No hay usuarios.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.first_name}</td>
                <td className="border border-gray-300 p-2">{user.last_name}</td>
                <td className="border border-gray-300 p-2">{user.dni}</td>
                <td className="border border-gray-300 p-2">
                  {
  user.role === 1 ? 'Usuario' :
  user.role === 2 ? 'Administrador' :
  user.role === 3 ? 'Cajero' :
  user.role === 4 ? 'Chef' :
  user.role === 5 ? 'Mesero' :
  'Desconocido'
}

                </td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <AlertDialog
                    open={isAlertOpen && deleteUserId === user.id}
                    onOpenChange={setIsAlertOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => {
                        setDeleteUserId(user.id);
                        setIsAlertOpen(true);
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Nombres"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Apellidos"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Select
              onValueChange={(val) => setRole(Number(val))}
              defaultValue={role.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="1">Usuario</SelectItem>
                  <SelectItem value="2">Admin</SelectItem>
                  <SelectItem value="3">Cajero</SelectItem>
                  <SelectItem value="4">Chef</SelectItem>
                  <SelectItem value="5">Mesero</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
