#!/usr/bin/env node
/**
 * Supabase Seed Hook - Create Auth Users
 * 
 * This script automatically creates auth users after the database seed runs.
 * It's designed to be called as a post-seed hook to ensure dev auth users
 * are created consistently after every database reset.
 */

const { createClient } = require('@supabase/supabase-js');

// Local development Supabase configuration
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAuthUsersHook() {
  console.log('🔗 Supabase Post-Seed Hook: Creating Auth Users...');
  
  // Dev users that match the seed data
  const devUsers = [
    { 
      email: 'john@example.com', 
      name: 'John Doe',
      profile_id: 'e3de7cf1-a7cb-4826-8cc6-02a3963d7629'
    },
    { 
      email: 'marie@example.com', 
      name: 'Marie Dupont',
      profile_id: '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b'
    },
    { 
      email: 'peter@example.com', 
      name: 'Peter Schmidt',
      profile_id: '44e6bc46-a589-4476-9472-d53980d5ea61'
    }
  ];
  
  try {
    let successCount = 0;
    
    for (const devUser of devUsers) {
      console.log(`   👤 Creating auth user: ${devUser.name} (${devUser.email})`);
      
      // Check if auth user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers.users?.find(u => u.email === devUser.email);
      
      if (existingUser) {
        console.log(`   ✅ Auth user already exists: ${devUser.email}`);
        
        // Update the profile to link to existing auth user
        const { error: linkError } = await supabase
          .from('users')
          .update({ auth_id: existingUser.id })
          .eq('id', devUser.profile_id);
        
        if (linkError) {
          console.log(`   ❌ Error linking profile: ${linkError.message}`);
        } else {
          console.log(`   ✅ Linked to existing profile`);
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
        .eq('id', devUser.profile_id);
      
      if (linkError) {
        console.log(`   ❌ Error linking profile: ${linkError.message}`);
      } else {
        console.log(`   ✅ Linked to profile user`);
        successCount++;
      }
    }

    console.log(`🎉 Auth users created successfully: ${successCount}/${devUsers.length}`);
    
    if (successCount > 0) {
      console.log('\n🚀 Development auth is ready!');
      console.log('   📱 Open your app');
      console.log('   ⚙️  Go to Settings → Authentication'); 
      console.log('   ⚡ Click "Quick Dev Login"');
      console.log('   🔑 Use: john@example.com / password123');
    }
    
    return successCount;
  } catch (error) {
    console.error('❌ Auth user creation failed:', error.message);
    throw error;
  }
}

// Export for use as a module or run directly
if (require.main === module) {
  createAuthUsersHook()
    .then(count => {
      console.log(`✅ Hook completed: ${count} auth users ready`);
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Hook failed:', error);
      process.exit(1);
    });
}

module.exports = { createAuthUsersHook };