
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://qljnuokdtamjuyvwtiob.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsam51b2tkdGFtanV5dnd0aW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjA3NTcsImV4cCI6MjA1OTc5Njc1N30.SLTBUyw6fftqYE2lGBjpCzy2tJKr0VPOwFntmWxez-U";

// Create a properly typed Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Export type helpers for database tables
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertType<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateType<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
