-- Create development auth users setup
-- Created: 2025-07-03
-- Description: Sets up a function to create dev auth users after migration

-- Create a function that can be called to setup dev auth users
CREATE OR REPLACE FUNCTION setup_dev_auth_users() 
RETURNS TEXT AS $$
BEGIN
  RAISE NOTICE 'Development auth users need to be created manually.';
  RAISE NOTICE 'Run: node create-dev-auth.js';
  RAISE NOTICE 'This creates: john@example.com, marie@example.com, peter@example.com';
  RAISE NOTICE 'Password: password123';
  
  RETURN 'Dev auth setup instructions displayed';
END;
$$ LANGUAGE plpgsql;

-- Display setup instructions
SELECT setup_dev_auth_users();