-- Add user preferences and bio field
-- Created: 2025-07-03
-- Description: Add bio field to users table and create user_preferences table

-- Add bio column to users table
ALTER TABLE users ADD COLUMN bio TEXT;

-- Create user_preferences table
CREATE TABLE user_preferences (
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

-- Create index for efficient user preference lookups
CREATE INDEX user_preferences_user_id_idx ON user_preferences(user_id);

-- Add updated_at trigger for user_preferences
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- User preferences policies
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