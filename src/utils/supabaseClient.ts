import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && 
                   supabaseUrl !== 'YOUR_SUPABASE_URL_HERE' && 
                   supabaseAnonKey && 
                   supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE';

if (!isConfigured) {
  console.warn('Supabase credentials missing or invalid. Please check your .env file.');
}

// We use a dummy URL if not configured to prevent the client from throwing on initialization
// but we should check 'isConfigured' before making any calls.
export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co', 
  isConfigured ? supabaseAnonKey : 'placeholder'
);

export { isConfigured };
