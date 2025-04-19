
import { supabase } from "@/integrations/supabase/client";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database, CustomDatabase } from "@/integrations/supabase/client";

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
 * A type-safe wrapper for supabase table operations that bypasses
 * TypeScript's type checking for table names by using type assertions.
 */
export function supabaseTable<T = any>(tableName: string) {
  return supabase.from(tableName) as unknown as PostgrestFilterBuilder<any, any, T>;
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
  return supabase.from(tableName) as unknown as PostgrestFilterBuilder<any, any, T>;
}

/**
 * Helper for creating records with proper type handling
 */
export function insertInto<T = any>(tableName: string, data: any) {
  return supabaseTable<T>(tableName).insert(data);
}

/**
 * Helper for updating records with proper type handling
 */
export function updateTable<T = any>(tableName: string, data: any) {
  return supabaseTable<T>(tableName).update(data);
}

/**
 * Helper for deleting records with proper type handling
 */
export function deleteFrom<T = any>(tableName: string) {
  return supabaseTable<T>(tableName).delete();
}
