import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


// Crear registros en la db
export async function storeInTable(table:any, body:any) {
  try {
    const { data, error } = await supabase.from(table).insert(body).select();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
