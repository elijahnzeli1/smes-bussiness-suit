import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
const supabaseUrl = 'YOUR_BASEURL';
const supabaseKey = 'YOUR_API_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
