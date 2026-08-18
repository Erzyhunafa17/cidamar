import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Client dengan service role — full database access
// HANYA digunakan di backend, tidak pernah diekspos ke frontend
export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
