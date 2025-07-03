-- Manual migration script to apply user preferences changes
-- Run this in Supabase Studio SQL Editor (http://127.0.0.1:54323)

-- 1. Add bio column to users table (if it doesn't exist)
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;

-- 2. Create user_preferences table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    
    -- Notification preferences
    notifications BOOLEAN DEFAULT TRUE,
    email_updates BOOLEAN DEFAULT FALSE,
    
    -- Privacy preferences  
    share_location BOOLEAN DEFAULT TRUE,
    public_profile BOOLEAN DEFAULT TRUE,
    
    -- Auto-behavior preferences
    auto_accept_requests BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create index for efficient user preference lookups (if it doesn't exist)
CREATE INDEX IF NOT EXISTS user_preferences_user_id_idx ON user_preferences(user_id);

-- 4. Add updated_at trigger for user_preferences (if function exists)
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable RLS on user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;

-- Create new policies
CREATE POLICY "Users can view own preferences" ON user_preferences
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE USING (user_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

-- 7. Update existing users with bio and avatar (if they don't have them)
UPDATE users SET 
    bio = CASE 
        WHEN email = 'john@example.com' THEN 'Passionate about DIY projects and helping neighbors with tools and equipment.'
        WHEN email = 'marie@example.com' THEN 'Cooking enthusiast who loves sharing kitchen gadgets and trying new recipes.'
        WHEN email = 'peter@example.com' THEN 'Outdoor adventure lover, always ready to share camping gear and sports equipment.'
        ELSE bio
    END,
    avatar = CASE 
        WHEN email = 'john@example.com' THEN 'https://via.placeholder.com/120x120?text=JD'
        WHEN email = 'marie@example.com' THEN 'https://via.placeholder.com/120x120?text=MD'
        WHEN email = 'peter@example.com' THEN 'https://via.placeholder.com/120x120?text=PS'
        ELSE avatar
    END
WHERE bio IS NULL OR avatar IS NULL;

-- 8. Insert user preferences for existing users (if they don't exist)
INSERT INTO user_preferences (user_id, notifications, email_updates, share_location, public_profile, auto_accept_requests)
SELECT 
    u.id,
    CASE 
        WHEN u.email = 'john@example.com' THEN true
        WHEN u.email = 'marie@example.com' THEN true
        WHEN u.email = 'peter@example.com' THEN false
        ELSE true
    END as notifications,
    CASE 
        WHEN u.email = 'john@example.com' THEN false
        WHEN u.email = 'marie@example.com' THEN true
        WHEN u.email = 'peter@example.com' THEN false
        ELSE false
    END as email_updates,
    true as share_location,
    true as public_profile,
    CASE 
        WHEN u.email = 'john@example.com' THEN false
        WHEN u.email = 'marie@example.com' THEN false
        WHEN u.email = 'peter@example.com' THEN true
        ELSE false
    END as auto_accept_requests
FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM user_preferences up WHERE up.user_id = u.id
);

-- 9. Verify the changes
SELECT 'Users with bio and avatar' as check_type, COUNT(*) as count FROM users WHERE bio IS NOT NULL AND avatar IS NOT NULL
UNION ALL
SELECT 'User preferences', COUNT(*) FROM user_preferences
UNION ALL
SELECT 'Total users', COUNT(*) FROM users;