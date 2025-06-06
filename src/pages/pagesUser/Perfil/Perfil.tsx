import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    dni: "",
    avatar_url: "",
  });
  const [puntos, setPuntos] = useState(0); // Puntos ahora se extraen de `profiles`
  const [compras, setCompras] = useState<any[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      // Obtener información del perfil
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, dni, avatar_url, points") // Agregar `points` aquí
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        console.error("Error obteniendo el perfil:", profileError);
      } else if (profileData) {
        setProfile(profileData);
        setPuntos(profileData.points || 0); // Asignar los puntos desde la tabla `profiles`
      }

      // Obtener las compras del usuario, si las hay
      const { data: comprasData, error: comprasError } = await supabase
        .from("compras")
        .select("producto, fecha, monto")
        .eq("user_id", session.user.id); // Cambié a `user_id` para obtener las compras del usuario

      if (comprasError) {
        console.error("Error obteniendo las compras:", comprasError);
      } else if (comprasData) {
        setCompras(comprasData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleSave = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    let avatar_url = profile.avatar_url;

    // Subir el nuevo avatar si es necesario
    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `avatars/${session.user.id}.${fileExt}`;

      // Borra primero si ya existe (opcional)
      await supabase.storage.from("caletaclub").remove([filePath]);

      const { error: uploadError } = await supabase.storage
        .from("caletaclub")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true,
          contentType: avatarFile.type,
        });

      if (uploadError) {
        console.error("Error subiendo imagen:", uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("caletaclub")
        .getPublicUrl(filePath);

      avatar_url = data.publicUrl;
    }

    // Actualizar perfil con nuevos datos
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        dni: profile.dni,
        avatar_url,
      })
      .eq("id", session.user.id);

    if (updateError) {
      console.error("Error actualizando perfil:", updateError);
    } else {
      // Actualiza el estado para reflejar la nueva URL
      setProfile((prev) => ({ ...prev, avatar_url }));
      setAvatarFile(null);
    }
  };

  if (loading) return <p className="text-center">Cargando perfil...</p>;

  return (
    <div className="max-w-2xl mx-auto pt-20 p-6">
      <h1 className="text-2xl font-bold text-sky-800 mb-4">Mi Perfil</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar_url} />
          <AvatarFallback>{profile.first_name[0]}{profile.last_name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <input type="file" accept="image/*" onChange={handleAvatarUpload} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombres</label>
          <Input
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Apellidos</label>
          <Input
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">DNI</label>
          <Input
            name="dni"
            value={profile.dni}
            onChange={handleChange}
          />
        </div>

        <Button onClick={handleSave} className="bg-sky-700 text-white mt-4">
          Guardar cambios
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-1">Mis Puntos</h2>
        <p className="text-2xl font-bold text-blue-800">{puntos} pts</p>
        <p className="text-sm text-gray-500">¡Sigue comprando para acumular más!</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <h2 className="text-lg font-semibold text-sky-700 mb-2">Historial de compras</h2>
        {compras.length === 0 ? (
          <p className="text-gray-500 text-sm">Aún no has realizado compras.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {compras.map((compra: any, index: number) => (
              <li key={index} className="py-2">
                <div className="flex justify-between">
                  <span className="text-sm">{compra.producto}</span>
                  <span className="text-sm text-gray-500">S/ {compra.monto.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">{compra.fecha}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
