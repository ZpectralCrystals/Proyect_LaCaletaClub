// src/components/admin/UserAdminPage.tsx
import { useEffect, useState } from 'react';
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
import { supabase } from '@/lib/supabaseClient';

export interface UserAdmin {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: {
    dni: string;
    role: number;
    avatar_url: string;
    puntos: number;
  };
}

export default function UserAdminPage() {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserAdmin | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<number>(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');

  // 🟢 Traer usuarios con perfiles y puntos
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          dni,
          role,
          avatar_url,
          user_pointstab: user_pointstab(points)
        `);

      if (profilesError) throw profilesError;

      // Obtener emails desde auth.users
      const formattedUsers: UserAdmin[] = await Promise.all(
        (profiles as any).map(async (p: any) => {
          const { data: userData, error: userError } = await supabase.auth.admin.getUserById(p.id);
          if (userError) throw userError;
          return {
            id: p.id,
            email: userData?.email ?? 'Sin email',
            first_name: p.first_name,
            last_name: p.last_name,
            profile: {
              dni: p.dni,
              role: p.role,
              avatar_url: p.avatar_url,
              puntos: p.user_pointstab?.[0]?.points ?? 0,
            },
          };
        })
      );

      setUsers(formattedUsers);
    } catch (err) {
      console.error(err);
      toast.error('Error cargando usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateDialog = () => {
    setEditUser(null);
    setEmail('');
    setRole(1);
    setFirstName('');
    setLastName('');
    setDni('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: UserAdmin) => {
    setEditUser(user);
    setEmail(user.email);
    setRole(user.profile?.role ?? 1);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setDni(user.profile?.dni ?? '');
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!email || !firstName || !lastName || !dni) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    try {
      if (editUser) {
        // Actualizar perfil
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ first_name: firstName, last_name: lastName, dni, role })
          .eq('id', editUser.id);

        if (profileError) throw profileError;
        toast.success('Usuario actualizado');
      } else {
        // Crear usuario con Auth
        const { data: userData, error: authError } = await supabase.auth.admin.createUser({
          email,
          password: '123456',
        });
        if (authError || !userData.user) throw authError;

        // Crear perfil asociado
        const { error: profileError } = await supabase.from('profiles').insert({
          id: userData.user.id,
          first_name: firstName,
          last_name: lastName,
          dni,
          role,
          avatar_url: '',
          puntos: 0,
        });
        if (profileError) throw profileError;

        toast.success('Usuario creado');
      }

      fetchUsers();
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Error guardando usuario');
    }
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;
    try {
      // Eliminar usuario con Supabase Admin
      const { error } = await supabase.auth.admin.deleteUser(deleteUserId);
      if (error) throw error;

      // Eliminar perfil asociado
      await supabase.from('profiles').delete().eq('id', deleteUserId);

      toast.success('Usuario eliminado');
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error('Error eliminando usuario');
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
              <th className="border border-gray-300 p-2">Puntos</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No hay usuarios.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.first_name}</td>
                  <td className="border border-gray-300 p-2">{user.last_name}</td>
                  <td className="border border-gray-300 p-2">{user.profile?.dni}</td>
                  <td className="border border-gray-300 p-2">
                    {user.profile?.role === 1 ? 'Usuario' :
                     user.profile?.role === 2 ? 'Administrador' :
                     user.profile?.role === 3 ? 'Cajero' :
                     user.profile?.role === 4 ? 'Chef' :
                     user.profile?.role === 5 ? 'Mesero' : 'Desconocido'}
                  </td>
                  <td className="border border-gray-300 p-2">{user.profile?.puntos}</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <AlertDialog open={isAlertOpen && deleteUserId === user.id} onOpenChange={setIsAlertOpen}>
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
              ))
            )}
          </tbody>
        </table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Nombres" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input placeholder="Apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Input placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
            <Select onValueChange={(val) => setRole(Number(val))} defaultValue={(role ?? 1).toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="1">Usuario</SelectItem>
                  <SelectItem value="2">Administrador</SelectItem>
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