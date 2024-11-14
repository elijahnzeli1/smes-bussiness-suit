import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_BASEURL';
const supabaseKey = 'YOUR_API_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
