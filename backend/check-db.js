const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('admins').select('*').limit(1);
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Admins table exists. Data:', data);
  }
}
check();
