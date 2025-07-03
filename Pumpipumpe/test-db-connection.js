// Quick script to test database connection and apply migration
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAndMigrate() {
  console.log('Testing database connection...');
  
  try {
    // Test basic connection
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.error('Error connecting to users table:', usersError);
      return;
    }
    
    console.log('✅ Connected to database successfully');
    console.log('Current users:', users?.length || 0);
    
    // Check if bio column exists
    const { data: userWithBio } = await supabase
      .from('users')
      .select('bio')
      .limit(1);
    
    if (userWithBio) {
      console.log('✅ Bio column exists');
    }
    
    // Check if user_preferences table exists
    const { data: preferences, error: prefError } = await supabase
      .from('user_preferences')
      .select('*')
      .limit(1);
    
    if (prefError) {
      console.log('❌ user_preferences table does not exist yet');
      console.log('Please run the manual-migration.sql in Supabase Studio at http://127.0.0.1:54323');
    } else {
      console.log('✅ user_preferences table exists');
      console.log('Current preferences:', preferences?.length || 0);
    }
    
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testAndMigrate();