
import { supabase, CustomDatabase } from "@/integrations/supabase/client";

// Type-safe helper for Supabase table operations
type TableNames = keyof CustomDatabase['public']['Tables'];

export function supabaseTable<T extends TableNames>(tableName: T) {
  // We need to create a workaround for the type issue
  // This ensures TypeScript compiles while maintaining runtime functionality
  return supabase.from(tableName as unknown as string) as ReturnType<typeof supabase.from>;
}

// Helper for type assertions in query responses
export function assertType<T>(data: any): T {
  return data as T;
}

// Export supabase directly for operations where we need the raw client
export { supabase };
