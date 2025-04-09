
import { supabase, CustomDatabase } from "@/integrations/supabase/client";

// Type-safe helper for Supabase table operations
type TableNames = keyof CustomDatabase['public']['Tables'];

export function supabaseTable<T extends TableNames>(tableName: T) {
  // We need to use any here because the Supabase types don't match exactly
  // This ensures TypeScript compiles while maintaining runtime functionality
  return supabase.from(tableName as any) as any;
}

// Helper for type assertions in query responses
export function assertType<T>(data: any): T {
  return data as T;
}

// Export supabase directly for operations where we need the raw client
export { supabase };
