import { createClient } from '@supabase/supabase-js';

// Check for environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('Missing Supabase environment variables');
}

// Initialize the Supabase client
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Optional: Add error handling
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        console.log('User signed out');
    } else if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.email);
    }
});

// Optional: Add a health check function
export const checkSupabaseConnection = async () => {
    try {
        const { data, error } = await supabase.from('health_check').select('*').limit(1);
        if (error) throw error;
        console.log('Supabase connection successful');
        return true;
    } catch (error) {
        console.error('Supabase connection failed:', error);
        return false;
    }
};
