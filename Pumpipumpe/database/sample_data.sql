-- Sample data for testing Pumpipumpe
-- Run this AFTER setting up the schema and creating some users through your app

-- Insert sample users (you'll need to replace auth_id with real values from Supabase Auth)
-- These are just examples - in practice, users will be created through your registration flow

-- Sample items (you can run this after you have real users in your system)
-- Note: Replace owner_id values with actual user IDs from your users table

-- Sample user in Zurich
INSERT INTO users (id, email, name, phone, address, location, auth_id) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'john.doe@example.com', 'John Doe', '+41791234567', 
 'Bahnhofstrasse 1, 8001 Zurich, Switzerland', 
 ST_Point(8.5417, 47.3769), 
 NULL -- Replace with actual auth.users.id after user registration
) ON CONFLICT (id) DO NOTHING;

-- Sample user in Geneva  
INSERT INTO users (id, email, name, phone, address, location, auth_id) VALUES 
('550e8400-e29b-41d4-a716-446655440002', 'marie.martin@example.com', 'Marie Martin', '+41791234568',
 'Rue du Rhône 10, 1204 Geneva, Switzerland',
 ST_Point(6.1432, 46.2044),
 NULL -- Replace with actual auth.users.id after user registration
) ON CONFLICT (id) DO NOTHING;

-- Sample items
INSERT INTO items (id, title, description, category, condition, images, tags, owner_id) VALUES 
('660e8400-e29b-41d4-a716-446655440001', 
 'Electric Drill', 
 'Powerful cordless drill, perfect for home projects. Includes battery and charger.',
 'tools', 
 'good',
 ARRAY['https://via.placeholder.com/300x300?text=Electric+Drill'],
 ARRAY['drill', 'power tool', 'cordless', 'home improvement'],
 '550e8400-e29b-41d4-a716-446655440001'
),
('660e8400-e29b-41d4-a716-446655440002',
 'Pasta Machine',
 'Manual pasta machine for making fresh homemade pasta. Excellent condition.',
 'kitchen',
 'like_new', 
 ARRAY['https://via.placeholder.com/300x300?text=Pasta+Machine'],
 ARRAY['pasta', 'cooking', 'italian', 'homemade'],
 '550e8400-e29b-41d4-a716-446655440002'
),
('660e8400-e29b-41d4-a716-446655440003',
 'Camping Tent',
 '4-person camping tent, waterproof and easy to set up. Great for weekend trips.',
 'sports',
 'good',
 ARRAY['https://via.placeholder.com/300x300?text=Camping+Tent'],
 ARRAY['camping', 'outdoor', 'tent', 'hiking'],
 '550e8400-e29b-41d4-a716-446655440001'
),
('660e8400-e29b-41d4-a716-446655440004',
 'Harry Potter Book Set',
 'Complete set of Harry Potter books in English. All 7 books in good condition.',
 'books',
 'good',
 ARRAY['https://via.placeholder.com/300x300?text=Harry+Potter+Books'],
 ARRAY['books', 'harry potter', 'fantasy', 'english'],
 '550e8400-e29b-41d4-a716-446655440002'
);

-- Sample borrow request
INSERT INTO borrow_requests (
    item_id, 
    borrower_id, 
    owner_id, 
    message, 
    requested_date,
    start_date,
    end_date
) VALUES (
    '660e8400-e29b-41d4-a716-446655440001', -- Electric Drill
    '550e8400-e29b-41d4-a716-446655440002', -- Marie (borrower)
    '550e8400-e29b-41d4-a716-446655440001', -- John (owner)
    'Hi! I need to drill some holes for shelves this weekend. Would Saturday morning work?',
    NOW(),
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '3 days'
);

-- Sample user addresses for multiple address support
INSERT INTO user_addresses (user_id, address_type, label, address, location, is_primary) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'home', 'Home', 
 'Bahnhofstrasse 1, 8001 Zurich, Switzerland', 
 ST_Point(8.5417, 47.3769), true),
('550e8400-e29b-41d4-a716-446655440001', 'work', 'Office', 
 'Paradeplatz 8, 8001 Zurich, Switzerland', 
 ST_Point(8.5391, 47.3690), false);

-- Test the nearby_items function
-- SELECT * FROM nearby_items(47.3769, 8.5417, 5000, 10);