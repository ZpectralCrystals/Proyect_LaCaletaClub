import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export default function PerfilAdministrador() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Obtener datos del perfil desde Django API
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:8000/api/auth/profile/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data); // Actualizar el perfil con los datos obtenidos
      } else {
        toast.error("No se pudo obtener el perfil");
      }
    };

    fetchProfile();
  }, []);

  // Manejar carga de imagen
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  // Guardar cambios en el perfil
  const handleSave = async () => {
    if (!profile) {
      toast.error("Perfil no encontrado");
      return;
    }

    let avatar_url = profile.avatar_url;

    if (avatarFile) {
      // Aquí puedes subir el avatar si se selecciona uno
      const fileExt = avatarFile.name.split(".").pop();
      const filePath = `avatars/${new Date().getTime()}.${fileExt}`;

      const { error: uploadError } = await fetch("http://localhost:8000/api/auth/upload-avatar/", {
        method: "POST",
        body: avatarFile,
      });

      if (!uploadError) {
        const { data } = await fetch(`http://localhost:8000/media/${filePath}`);
        avatar_url = data.publicUrl;
      }
    }

    const payload = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url,
    };

    const response = await fetch("http://localhost:8000/api/auth/profile/update/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast.success("Perfil actualizado correctamente");
    } else {
      toast.error("Error al actualizar el perfil");
    }
  };

  // Cambiar contraseña del usuario
  const handleChangePassword = async () => {
    if (!password) {
      setMessage("La contraseña no puede estar vacía.");
      return;
    }

    const response = await fetch("http://localhost:8000/api/auth/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setMessage("Contraseña actualizada correctamente");
      setPassword("");
    } else {
      setMessage("Error al actualizar la contraseña");
    }
  };

  // Mostrar un mensaje de carga si el perfil aún no ha sido cargado
  if (!profile) {
    return <div>Cargando perfil...</div>; // Aseguramos que si no está cargado, mostramos un mensaje
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold text-sky-700 text-center">Perfil</h1>

          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{profile.first_name[0]}</AvatarFallback>
            </Avatar>
            <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </div>

          <div className="space-y-2">
            <div>
              <Label>Email</Label>
              <Input value={profile.email} readOnly />
            </div>
            <div>
              <Label>Nombre</Label>
              <Input
                value={profile.first_name}
                onChange={(e) =>
                  setProfile({ ...profile, first_name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Apellido</Label>
              <Input
                value={profile.last_name}
                onChange={(e) =>
                  setProfile({ ...profile, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-sky-600">Cambiar Contraseña</h2>
          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleChangePassword}>Cambiar Contraseña</Button>
          {message && <p className="text-sm text-center text-green-600">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
