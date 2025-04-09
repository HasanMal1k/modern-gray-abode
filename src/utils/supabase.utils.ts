
import { supabase, CustomDatabase } from "@/integrations/supabase/client";

// Type-safe helper for Supabase table operations
type TableNames = keyof CustomDatabase['public']['Tables'];

export function supabaseTable<T extends TableNames>(tableName: T) {
  return supabase.from(tableName as string) as unknown as ReturnType<typeof supabase.from>;
}

// Helper for type assertions in query responses
export function assertType<T>(data: any): T {
  return data as T;
}

// Export supabase directly for operations where we need the raw client
export { supabase };
