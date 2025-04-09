
import { supabase, CustomDatabase } from "@/integrations/supabase/client";

// Type-safe helper for Supabase table operations
type TableNames = keyof CustomDatabase['public']['Tables'];

export function supabaseTable<T extends TableNames>(tableName: T) {
  // Use a more explicit type assertion to make TypeScript happy
  // The 'as any' is necessary to work around the type constraints while preserving runtime functionality
  return supabase.from(tableName as string) as any;
}

// Helper for type assertions in query responses
export function assertType<T>(data: any): T {
  return data as T;
}

// Export supabase directly for operations where we need the raw client
export { supabase };
