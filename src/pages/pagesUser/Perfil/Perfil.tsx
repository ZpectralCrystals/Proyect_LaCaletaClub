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
  const [puntos, setPuntos] = useState(0);
  const [compras, setCompras] = useState<any[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data);

      const resPuntos = await fetch("http://localhost:8000/api/user/puntos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const puntosData = await resPuntos.json();
      setPuntos(puntosData.points);

      const resCompras = await fetch("http://localhost:8000/api/user/compras/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const comprasData = await resCompras.json();
      setCompras(comprasData);
    } catch (err) {
      console.error("Error cargando datos del perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleSave = async () => {
  const token = localStorage.getItem("access");
  if (!token) return;

  const formData = new FormData();
  formData.append("first_name", profile.first_name);
  formData.append("last_name", profile.last_name);
  formData.append("dni", profile.dni);
  if (avatarFile) formData.append("avatar", avatarFile);

  try {
    const res = await fetch("http://localhost:8000/api/auth/me/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Error al guardar perfil");
    const updated = await res.json();
    setProfile(updated);
    setAvatarFile(null);
  } catch (error) {
    console.error(error);
  }
};



  if (loading) return <p className="text-center">Cargando perfil...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
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
