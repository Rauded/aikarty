import { useSession } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';

// This hook returns a Supabase client that injects the Clerk JWT into every request
export function useClerkSupabaseClient() {
  const { session } = useSession();

  // Memoize the client so it's not recreated on every render
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: async (url, options = {}) => {
          // Get the Clerk Supabase token from the session
          const clerkToken = await session?.getToken({ template: 'supabase' });
          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`);
          }
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}