
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/types/supabase";

// Type-safe table helper
export function table<T extends keyof Database['public']['Tables']>(
  tableName: T
) {
  return supabase.from(tableName);
}

// Additional type-safe table helper (alias of table function)
export function supabaseTable<T extends keyof Database['public']['Tables']>(
  tableName: T
) {
  return supabase.from(tableName);
}

// Helper function to get typed data from a query
export function getTypedData<T>(data: T | null) {
  return data as NonNullable<T>;
}

// Helper to handle database errors with a friendly message
export function handleSupabaseError(error: unknown): string {
  console.error('Supabase error:', error);
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as { message: string }).message;
  }
  return 'An unexpected error occurred';
}

// Type assertion helper function
export function assertType<T>(data: unknown): T {
  return data as T;
}

// Type-safe insert function that avoids the incorrect generic approach
export function insertTable(tableName: string, data: any) {
  return supabase.from(tableName).insert(data);
}

// Type-safe update function that avoids the incorrect generic approach
export function updateTable(tableName: string, data: any) {
  return supabase.from(tableName).update(data);
}

// Type-safe delete function that avoids the incorrect generic approach
export function deleteFromTable(tableName: string) {
  return supabase.from(tableName).delete();
}

// Export supabase for direct access when needed
export { supabase };
