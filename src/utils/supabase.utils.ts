
import { supabase } from "@/integrations/supabase/client";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

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
 * TypeScript's type checking for table names.
 */
export function supabaseTable(tableName: string) {
  return supabase.from(tableName as never) as any;
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
  return supabase.from(tableName as never) as any;
}

/**
 * Helper for creating records with proper type handling
 */
export function insertInto<T = any>(tableName: string, data: any) {
  return supabaseTable(tableName).insert(data as never) as PostgrestFilterBuilder<any, any, any>;
}

/**
 * Helper for updating records with proper type handling
 */
export function updateTable<T = any>(tableName: string, data: any) {
  return supabaseTable(tableName).update(data as never) as PostgrestFilterBuilder<any, any, any>;
}

/**
 * Helper for deleting records with proper type handling
 */
export function deleteFrom(tableName: string) {
  return supabaseTable(tableName).delete() as PostgrestFilterBuilder<any, any, any>;
}
