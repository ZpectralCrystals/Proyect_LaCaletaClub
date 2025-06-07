// ✅ Interfaz que define los datos del perfil del usuario
interface Profile {
  first_name: string;
  last_name: string;
  avatar_url?: string; // Opcional: puede no tener imagen
}

// ✅ Props que recibe este componente
interface Props {
  profile: Profile;       // Información del usuario
  description: string;    // Texto de la recomendación
}

/**
 * 🎯 Componente que representa una tarjeta visual de recomendación.
 * Muestra el nombre, avatar y descripción de la recomendación.
 */
const RecomendacionCard = ({ profile, description }: Props) => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center transition hover:scale-105 duration-300">
      {/* 🖼️ Avatar con imagen o avatar por defecto */}
      <img
        src={profile.avatar_url || "/default-avatar.png"}
        alt={`${profile.first_name} ${profile.last_name}`}
        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-sky-200"
      />

      {/* 👤 Nombre del usuario */}
      <h3 className="text-lg font-semibold text-sky-700">
        {profile.first_name} {profile.last_name}
      </h3>

      {/* 💬 Descripción (recomendación) */}
      <p className="text-gray-700 mt-2 text-sm italic">
        “{description}”
      </p>
    </div>
  );
};

export default RecomendacionCard;
