// src/types/userAdmin.ts
export interface UserAdmin {
  id: string;
  email: string;
  role: number;
  first_name: string;
  last_name: string;
  dni: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}
export interface Recomendacion {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

export interface RecomendacionRaw {
  id: number;
  created_at: string;
  userid: string;
  isActive: boolean;
  description: string;
  profile: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
}
export interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: number;
  avatar_url?: string;
}