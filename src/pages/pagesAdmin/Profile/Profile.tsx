// src/components/admin/PerfilAdministrador.tsx
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient"; // tu cliente Supabase configurado

interface Profile {
  id: string;
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

  // Obtener datos del perfil desde Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      const user = supabase.auth.getUser(); // Opcionalmente puedes usar supabase.auth.getSession()
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", (await user).data.user?.id)
        .single();

      if (error) {
        toast.error("No se pudo obtener el perfil");
        console.error(error);
      } else {
        setProfile(data as Profile);
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
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Subir a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars") // nombre del bucket en Supabase
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        toast.error("Error subiendo la imagen");
        console.error(uploadError);
        return;
      }

      // Obtener la URL pública de la imagen
      const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      avatar_url = publicUrlData.publicUrl;
    }

    // Actualizar datos en tabla profiles
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url,
      })
      .eq("id", profile.id);

    if (error) {
      toast.error("Error al actualizar el perfil");
      console.error(error);
    } else {
      toast.success("Perfil actualizado correctamente");
      setProfile({ ...profile, avatar_url });
      setAvatarFile(null);
    }
  };

  // Cambiar contraseña usando Supabase Auth
  const handleChangePassword = async () => {
    if (!password) {
      setMessage("La contraseña no puede estar vacía.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Error al actualizar la contraseña");
      console.error(error);
    } else {
      setMessage("Contraseña actualizada correctamente");
      setPassword("");
    }
  };

  if (!profile) {
    return <div>Cargando perfil...</div>;
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
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Apellido</Label>
              <Input
                value={profile.last_name}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
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