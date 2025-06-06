import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabaseClient";

// Tipado de perfil
interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export default function PerfilAdministrador() {
  const [profile, setProfile] = useState<Profile>({
    email: "",
    first_name: "",
    last_name: "",
    avatar_url: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Obtener datos del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data } = await supabase
        .from("profiles")
        .select("email, first_name, last_name, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (data) setProfile(data);
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
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    let avatar_url = profile.avatar_url;

    // Subir avatar si se seleccionó uno
    if (avatarFile) {
      const fileExt = avatarFile.name.split(".").pop();
      const filePath = `${session.user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("caletaclub")
        .upload(`avatars/${filePath}`, avatarFile, { upsert: true });

      if (!uploadError) {
        const { data } = supabase.storage
          .from("caletaclub")
          .getPublicUrl(`avatars/${filePath}`);
        avatar_url = data.publicUrl;
      }
    }

    // Actualizar perfil en Supabase
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url,
      })
      .eq("email", profile.email);

    if (!error) {
      setMessage("Perfil actualizado correctamente.");
    } else {
      setMessage("Error al actualizar el perfil.");
    }
  };

  // Cambiar contraseña del usuario
  const handleChangePassword = async () => {
    if (!password) return setMessage("La contraseña no puede estar vacía.");

    const { error } = await supabase.auth.updateUser({ password });
    if (!error) {
      setMessage("Contraseña actualizada correctamente.");
      setPassword("");
    } else {
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      {/* Card de perfil */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold text-sky-700 text-center">Perfil</h1>

          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>
                {profile.first_name ? profile.first_name[0] : "?"}
              </AvatarFallback>
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
            <div>
              <Label>Rol</Label>
              <Input value="Administrador" readOnly />
            </div>
          </div>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </CardContent>
      </Card>

      {/* Card de contraseña */}
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
