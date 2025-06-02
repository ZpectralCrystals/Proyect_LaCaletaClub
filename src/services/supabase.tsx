import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

/**
 * Inserta registros en una tabla de Supabase.
 * @param table Nombre de la tabla.
 * @param body Objeto o arreglo de objetos con los datos a insertar.
 * @returns Resultado con éxito o error tipado correctamente.
 */
export async function storeInTable<T extends Record<string, unknown>>(
  table: string,
  body: T | T[]
): Promise<{ success: true; data: T[] } | { success: false; error: string }> {
  try {
    const { data, error } = await supabase.from(table).insert(body).select();

    if (error) throw error;

    return { success: true, data: data as T[] };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: message };
  }
}
