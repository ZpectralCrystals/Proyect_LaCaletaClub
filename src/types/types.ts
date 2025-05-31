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
