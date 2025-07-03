// Script to create a dev user in Supabase Auth for testing
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDevUser() {
  console.log('Setting up dev user...');
  
  try {
    // Create auth user for John Doe
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'john@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        name: 'John Doe'
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    console.log('✅ Auth user created:', authData.user.email);

    // Update the users table to link with auth
    const { error: updateError } = await supabase
      .from('users')
      .update({ auth_id: authData.user.id })
      .eq('email', 'john@example.com');

    if (updateError) {
      console.error('Error linking user profile:', updateError);
      return;
    }

    console.log('✅ User profile linked to auth');
    console.log('✅ Dev user setup complete!');
    console.log('');
    console.log('You can now use:');
    console.log('📧 Email: john@example.com');
    console.log('🔑 Password: password123');

  } catch (error) {
    console.error('Error setting up dev user:', error);
  }
}

setupDevUser();