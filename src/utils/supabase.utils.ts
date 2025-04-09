
import { supabase } from "@/integrations/supabase/client";

// Export supabase directly for operations where we need the raw client
export { supabase };

/**
 * Type assertion helper for supabase queries.
 * This forces TypeScript to accept the return type we specify.
 */
export function assertType<T>(data: any): T {
  return data as T;
}

/**
 * A type-safe wrapper for supabase table operations.
 * This function bypasses TypeScript's type checking for table names,
 * which is necessary because the Database type in types.ts is empty.
 */
export function supabaseTable(tableName: string) {
  return supabase.from(tableName as any) as any;
}

/**
 * Use this function to perform database operations with explicit typing.
 * 
 * Example:
 * const { data, error } = await fromTable<PropertyType>("properties")
 *   .select("*")
 *   .eq("id", propertyId);
 */
export function fromTable<T = any>(tableName: string) {
  return supabase.from(tableName as any) as any;
}
