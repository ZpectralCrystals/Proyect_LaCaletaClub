// src/components/RecomendacionCard.tsx

interface Profile {
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface Props {
  profile: Profile;
  description: string;
}

const RecomendacionCard = ({ profile, description }: Props) => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center transition hover:scale-105 duration-300">
      <img
        src={profile.avatar_url || "/default-avatar.png"}
        alt={`${profile.first_name} ${profile.last_name}`}
        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-sky-200"
      />
      <h3 className="text-lg font-semibold text-sky-700">
        {profile.first_name} {profile.last_name}
      </h3>
      <p className="text-gray-700 mt-2 text-sm italic">“{description}”</p>
    </div>
  );
};

export default RecomendacionCard;
