// Quick script to create dev auth users
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createDevAuth() {
  console.log('🔧 Creating dev auth users...');
  
  try {
    // Create John Doe auth user
    const { data: johnAuth, error: johnError } = await supabase.auth.admin.createUser({
      email: 'john@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: { name: 'John Doe' }
    });

    if (johnError) {
      console.error('❌ Error creating John:', johnError.message);
    } else {
      console.log('✅ Created John Doe auth user:', johnAuth.user.email);
      
      // Link to profile user
      const { error: updateError } = await supabase
        .from('users')
        .update({ auth_id: johnAuth.user.id })
        .eq('email', 'john@example.com');
      
      if (updateError) {
        console.error('❌ Error linking John profile:', updateError.message);
      } else {
        console.log('✅ Linked John to profile user');
      }
    }

    // Create Marie Dupont auth user
    const { data: marieAuth, error: marieError } = await supabase.auth.admin.createUser({
      email: 'marie@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: { name: 'Marie Dupont' }
    });

    if (marieError) {
      console.error('❌ Error creating Marie:', marieError.message);
    } else {
      console.log('✅ Created Marie Dupont auth user:', marieAuth.user.email);
      
      // Link to profile user
      const { error: updateError } = await supabase
        .from('users')
        .update({ auth_id: marieAuth.user.id })
        .eq('email', 'marie@example.com');
      
      if (updateError) {
        console.error('❌ Error linking Marie profile:', updateError.message);
      } else {
        console.log('✅ Linked Marie to profile user');
      }
    }

    // Test login
    console.log('\n🧪 Testing dev login...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'john@example.com',
      password: 'password123'
    });

    if (loginError) {
      console.error('❌ Login test failed:', loginError.message);
    } else {
      console.log('✅ Login test successful!');
      await supabase.auth.signOut();
    }

    console.log('\n🎉 Dev auth setup complete!');
    console.log('You can now use "⚡ Quick Dev Login" in the app');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

createDevAuth();