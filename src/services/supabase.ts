import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xpwylsnkjmldeojxbxbk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwd3lsc25ram1sZGVvanhieGJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjQ5NjU1NywiZXhwIjoyMDQyMDcyNTU3fQ.ynvuosXGY8ns7ZXLrUinuNKtJ9QdPmVcNThgjzaWY-c';

export const supabase = createClient(supabaseUrl, supabaseKey);