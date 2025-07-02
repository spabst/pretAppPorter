-- Pumpipumpe Database Schema
-- Run this in your Supabase SQL Editor

-- Enable PostGIS extension for geolocation features
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create custom types/enums
CREATE TYPE item_category AS ENUM (
    'tools',
    'electronics', 
    'books',
    'kitchen',
    'garden',
    'sports',
    'household',
    'automotive',
    'other'
);

CREATE TYPE item_condition AS ENUM (
    'new',
    'like_new',
    'good',
    'fair',
    'poor'
);

CREATE TYPE request_status AS ENUM (
    'pending',
    'approved',
    'declined',
    'active',
    'completed',
    'cancelled'
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    avatar TEXT,
    address TEXT NOT NULL,
    location GEOGRAPHY(POINT) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Link to Supabase auth
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create spatial index for location queries
CREATE INDEX users_location_idx ON users USING GIST (location);

-- Items table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category item_category NOT NULL,
    condition item_condition NOT NULL,
    images TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    is_available BOOLEAN DEFAULT TRUE,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX items_owner_id_idx ON items(owner_id);
CREATE INDEX items_category_idx ON items(category);
CREATE INDEX items_is_available_idx ON items(is_available);
CREATE INDEX items_created_at_idx ON items(created_at DESC);

-- Borrow requests table
CREATE TABLE borrow_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    borrower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status request_status DEFAULT 'pending',
    message TEXT NOT NULL,
    requested_date TIMESTAMP WITH TIME ZONE NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for borrow requests
CREATE INDEX borrow_requests_item_id_idx ON borrow_requests(item_id);
CREATE INDEX borrow_requests_borrower_id_idx ON borrow_requests(borrower_id);
CREATE INDEX borrow_requests_owner_id_idx ON borrow_requests(owner_id);
CREATE INDEX borrow_requests_status_idx ON borrow_requests(status);

-- User addresses table (for multiple addresses support)
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    address_type TEXT NOT NULL DEFAULT 'other', -- 'home', 'work', 'other'
    label TEXT NOT NULL,
    address TEXT NOT NULL,
    location GEOGRAPHY(POINT) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial index for user addresses
CREATE INDEX user_addresses_location_idx ON user_addresses USING GIST (location);
CREATE INDEX user_addresses_user_id_idx ON user_addresses(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic updated_at updates
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_borrow_requests_updated_at BEFORE UPDATE ON borrow_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to find nearby items using PostGIS
CREATE OR REPLACE FUNCTION nearby_items(
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    max_distance DOUBLE PRECISION DEFAULT 10000, -- 10km default
    limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    category item_category,
    condition item_condition,
    images TEXT[],
    tags TEXT[],
    is_available BOOLEAN,
    owner_id UUID,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    distance DOUBLE PRECISION,
    owner_name TEXT,
    owner_address TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.title,
        i.description,
        i.category,
        i.condition,
        i.images,
        i.tags,
        i.is_available,
        i.owner_id,
        i.created_at,
        i.updated_at,
        ST_Distance(u.location, ST_Point(lng, lat)::geography) as distance,
        u.name as owner_name,
        u.address as owner_address
    FROM items i
    JOIN users u ON i.owner_id = u.id
    WHERE 
        i.is_available = TRUE
        AND ST_DWithin(u.location, ST_Point(lng, lat)::geography, max_distance)
    ORDER BY u.location <-> ST_Point(lng, lat)::geography
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE borrow_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = auth_id);

-- Items policies
CREATE POLICY "Anyone can view available items" ON items
    FOR SELECT USING (is_available = true);

CREATE POLICY "Users can view own items" ON items
    FOR SELECT USING (owner_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can insert own items" ON items
    FOR INSERT WITH CHECK (owner_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can update own items" ON items
    FOR UPDATE USING (owner_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can delete own items" ON items
    FOR DELETE USING (owner_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

-- Borrow requests policies
CREATE POLICY "Users can view own borrow requests" ON borrow_requests
    FOR SELECT USING (
        borrower_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        OR owner_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Users can create borrow requests" ON borrow_requests
    FOR INSERT WITH CHECK (
        borrower_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Users can update own borrow requests" ON borrow_requests
    FOR UPDATE USING (
        borrower_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        OR owner_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- User addresses policies
CREATE POLICY "Users can view own addresses" ON user_addresses
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can manage own addresses" ON user_addresses
    FOR ALL USING (user_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
    ));

-- Create storage bucket for item images
INSERT INTO storage.buckets (id, name, public) VALUES ('item-images', 'item-images', true);

-- Storage policies for item images
CREATE POLICY "Anyone can view item images" ON storage.objects
    FOR SELECT USING (bucket_id = 'item-images');

CREATE POLICY "Users can upload item images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'item-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own item images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'item-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own item images" ON storage.objects
    FOR DELETE USING (bucket_id = 'item-images' AND auth.uid()::text = (storage.foldername(name))[1]);