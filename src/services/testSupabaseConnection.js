import { supabase } from './supabaseClient';

// This function tests the Supabase connection by fetching one row from the flashcard_sets table.
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('flashcard_sets')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error.message);
      return false;
    }
    console.log('Supabase connection successful. Sample data:', data);
    return true;
  } catch (err) {
    console.error('Unexpected error testing Supabase connection:', err);
    return false;
  }
}

// For quick manual testing, uncomment the following lines to run the test on import:
// testSupabaseConnection();