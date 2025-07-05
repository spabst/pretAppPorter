#!/usr/bin/env node
// Development Auth Setup Script
// Run this after `supabase db reset` to create dev auth users

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createDevAuth() {
  console.log('🔧 Setting up development authentication...');
  console.log('📍 This creates dev users that survive until next database reset\n');
  
  const devUsers = [
    { email: 'john@example.com', name: 'John Doe' },
    { email: 'marie@example.com', name: 'Marie Dupont' },
    { email: 'peter@example.com', name: 'Peter Schmidt' }
  ];
  
  try {
    let successCount = 0;
    
    for (const devUser of devUsers) {
      console.log(`👤 Creating ${devUser.name}...`);
      
      // Check if auth user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers.users?.find(u => u.email === devUser.email);
      
      if (existingUser) {
        console.log(`   ✅ Auth user already exists: ${devUser.email}`);
        
        // Just link to profile user
        const { error: linkError } = await supabase
          .from('users')
          .update({ auth_id: existingUser.id })
          .eq('email', devUser.email);
        
        if (linkError) {
          console.log(`   ❌ Error linking profile: ${linkError.message}`);
        } else {
          console.log(`   ✅ Linked to profile user`);
          successCount++;
        }
        continue;
      }
      
      // Create new auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: devUser.email,
        password: 'password123',
        email_confirm: true,
        user_metadata: { name: devUser.name }
      });

      if (authError) {
        console.log(`   ❌ Error creating auth user: ${authError.message}`);
        continue;
      }

      console.log(`   ✅ Created auth user: ${authData.user.email}`);
      
      // Link to profile user
      const { error: linkError } = await supabase
        .from('users')
        .update({ auth_id: authData.user.id })
        .eq('email', devUser.email);
      
      if (linkError) {
        console.log(`   ❌ Error linking profile: ${linkError.message}`);
      } else {
        console.log(`   ✅ Linked to profile user`);
        successCount++;
      }
    }

    // Test login with John Doe
    console.log('\n🧪 Testing login...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'john@example.com',
      password: 'password123'
    });

    if (loginError) {
      console.log('❌ Login test failed:', loginError.message);
    } else {
      console.log('✅ Login test successful!');
      await supabase.auth.signOut();
    }

    console.log(`\n🎉 Development auth setup complete!`);
    console.log(`📊 Result: ${successCount}/${devUsers.length} users created and linked`);
    
    if (successCount > 0) {
      console.log('\n🚀 Ready for development:');
      console.log('   • Open your app');
      console.log('   • Go to Settings → Authentication');
      console.log('   • Click "⚡ Quick Dev Login"');
      console.log('   • All your data and preferences will be there!');
    }
    
    console.log('\n📝 Login credentials:');
    console.log('   📧 Email: john@example.com (or marie@example.com, peter@example.com)');
    console.log('   🔑 Password: password123');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure Supabase is running: npx supabase status');
    console.log('   2. Make sure migrations are applied: npx supabase db reset');
    console.log('   3. Try running this script again');
  }
}

// Check if called directly
if (require.main === module) {
  createDevAuth();
}

module.exports = { createDevAuth };