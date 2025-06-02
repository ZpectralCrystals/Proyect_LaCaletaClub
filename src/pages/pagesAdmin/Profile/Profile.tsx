import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function PerfilUsuario() {
  const session = useSelector((state: RootState) => state.auth.user);
  const [perfil, setPerfil] = useState({
    dni: "",
    first_name: "",
    last_name: "",
    avatar_url: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.id) {
      getPerfil();
    }
  }, [session]);

  const getPerfil = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("dni, first_name, last_name, avatar_url")
      .eq("id", session.id)
      .single();

    if (!error && data) {
      setPerfil(data);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile || !session) return;

    const fileExt = avatarFile.name.split(".").pop()?.toLowerCase();
    if (!["png", "jpg", "jpeg"].includes(fileExt || "")) {
      alert("Solo se permiten archivos .jpg o .png");
      return;
    }

    const fileName = `${session.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("caletaclub")
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
      alert("Error subiendo el avatar.");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("caletaclub")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", session.id);

    if (!updateError) {
      setPerfil((prev) => ({ ...prev, avatar_url: publicUrl }));
      alert("Avatar actualizado correctamente.");
    }
  };

  const handleGuardarCambios = async () => {
    if (!session) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        dni: perfil.dni,
        first_name: perfil.first_name,
        last_name: perfil.last_name,
      })
      .eq("id", session.id);

    if (!error) {
      setMessage("Datos actualizados correctamente.");
    } else {
      setMessage("Error al actualizar los datos.");
    }
  };

  const handleCambiarPassword = async () => {
    if (!password.trim()) return;

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (!error) {
      setPassword("");
      setMessage("Contraseña actualizada correctamente.");
    } else {
      setMessage("Error al actualizar contraseña.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold text-sky-700 text-center">Mi Perfil</h1>

          <div className="flex flex-col items-center">
            <img
              src={perfil.avatar_url || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2 border"
            />
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handleAvatarUpload} className="mt-2">Actualizar Avatar</Button>
          </div>

          <div className="space-y-3 mt-6">
            <div>
              <Label>DNI</Label>
              <Input
                value={perfil.dni}
                onChange={(e) => setPerfil({ ...perfil, dni: e.target.value })}
              />
            </div>
            <div>
              <Label>Nombres</Label>
              <Input
                value={perfil.first_name}
                onChange={(e) => setPerfil({ ...perfil, first_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Apellidos</Label>
              <Input
                value={perfil.last_name}
                onChange={(e) => setPerfil({ ...perfil, last_name: e.target.value })}
              />
            </div>
            <Button onClick={handleGuardarCambios}>Guardar Cambios</Button>
          </div>
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
          <Button onClick={handleCambiarPassword}>Cambiar Contraseña</Button>
        </CardContent>
      </Card>

      {message && (
        <p className="text-sm text-center text-green-600">{message}</p>
      )}
    </div>
  );
}
