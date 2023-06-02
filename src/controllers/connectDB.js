import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from './config';

const connectDB = () => {
  
  const supabase = createClient( SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  console.log('Database connection established');
  return supabase
};

export default connectDB;