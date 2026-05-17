import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SB_URL,
    process.env.NEXT_PUBLIC_SB_KEY
  );
}

let _client = null;
export function getSupabaseClient() {
  if (!_client) _client = createSupabaseClient();
  return _client;
}
