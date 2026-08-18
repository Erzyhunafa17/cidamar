import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Digunakan oleh client-side code untuk upload gambar ke Supabase Storage.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
