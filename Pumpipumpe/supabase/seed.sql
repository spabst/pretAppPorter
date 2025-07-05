-- Pumpipumpe Development Seed Data
-- Created: 2025-07-03
-- Description: Sample users and items for consistent development experience

-- Insert sample users with locations in Switzerland
-- Note: auth_id will be set by the auth user migration (20250703000002_create_dev_auth_users.sql)
INSERT INTO users (id, email, name, phone, address, location, bio, avatar) VALUES
(
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629',
    'john@example.com', 
    'John Doe', 
    '+41791234567', 
    'Rue de la Paix 15, 1003 Lausanne',
    ST_GeogFromText('POINT(6.6323 46.5197)'),
    'Passionate about DIY projects and helping neighbors with tools and equipment.',
    'https://via.placeholder.com/120x120?text=JD'
),
(
    '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b',
    'marie@example.com', 
    'Marie Dupont', 
    '+41792345678', 
    'Avenue Mon-Repos 24, 1005 Lausanne',
    ST_GeogFromText('POINT(6.6387 46.5229)'),
    'Cooking enthusiast who loves sharing kitchen gadgets and trying new recipes.',
    'https://via.placeholder.com/120x120?text=MD'
),
(
    '44e6bc46-a589-4476-9472-d53980d5ea61',
    'peter@example.com', 
    'Peter Schmidt', 
    '+41793456789', 
    'Chemin des Boveresses 155, 1066 Epalinges',
    ST_GeogFromText('POINT(6.6708 46.5339)'),
    'Outdoor adventure lover, always ready to share camping gear and sports equipment.',
    'https://via.placeholder.com/120x120?text=PS'
);

-- Insert sample items
INSERT INTO items (id, title, description, category, condition, tags, is_available, owner_id) VALUES
(
    '4ae90281-40da-4066-98c5-b2a0e565d2a2',
    'Drill Machine',
    'Powerful cordless drill perfect for home projects',
    'tools',
    'good',
    ARRAY['drill', 'cordless', 'home improvement'],
    true,
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629'
),
(
    '0da67cfc-3ba1-45b6-b3ba-2143e72d59fc',
    'Pasta Machine',
    'Manual pasta maker, makes fresh pasta easily',
    'kitchen',
    'like_new',
    ARRAY['pasta', 'cooking', 'italian'],
    true,
    '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b'
),
(
    '8d1420de-3f2e-4061-93bb-2cb7e4d523cc',
    'Camping Tent',
    '4-person camping tent, waterproof and easy to set up',
    'sports',
    'good',
    ARRAY['camping', 'outdoor', '4-person'],
    true,
    '44e6bc46-a589-4476-9472-d53980d5ea61'
),
(
    '9eff653c-d1a4-468d-a5cb-7e22d53a2054',
    'Book: Clean Code',
    'Programming book about writing clean, maintainable code',
    'books',
    'good',
    ARRAY['programming', 'software', 'development'],
    true,
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629'
),
(
    '793e2fc7-5abc-4559-a9fd-642c6a9729f7',
    'Garden Hose',
    '25m garden hose with spray nozzle',
    'garden',
    'fair',
    ARRAY['watering', 'garden', 'hose'],
    true,
    '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b'
);

-- Insert some sample borrow requests for testing
INSERT INTO borrow_requests (
    item_id, 
    borrower_id, 
    owner_id, 
    status, 
    message, 
    requested_date,
    start_date,
    end_date
) VALUES
(
    '4ae90281-40da-4066-98c5-b2a0e565d2a2', -- Drill Machine
    '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b', -- Marie
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629', -- John
    'pending',
    'Hi! I need to hang some pictures in my apartment. Could I borrow your drill for the weekend?',
    '2025-07-04 10:00:00+00',
    '2025-07-05 09:00:00+00',
    '2025-07-06 18:00:00+00'
),
(
    '8d1420de-3f2e-4061-93bb-2cb7e4d523cc', -- Camping Tent
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629', -- John
    '44e6bc46-a589-4476-9472-d53980d5ea61', -- Peter
    'approved',
    'Planning a camping trip to the Alps next weekend. Would love to borrow your tent!',
    '2025-07-03 14:30:00+00',
    '2025-07-08 16:00:00+00',
    '2025-07-10 20:00:00+00'
);

-- Insert some user addresses for testing multiple address support
INSERT INTO user_addresses (
    user_id,
    address_type,
    label,
    address,
    location,
    is_primary
) VALUES
(
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629',
    'home',
    'Home Address',
    'Rue de la Paix 15, 1003 Lausanne',
    ST_GeogFromText('POINT(6.6323 46.5197)'),
    true
),
(
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629',
    'work',
    'Office',
    'Place de la Gare 8, 1003 Lausanne',
    ST_GeogFromText('POINT(6.6343 46.5169)'),
    false
),
(
    '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b',
    'home',
    'Chez Marie',
    'Avenue Mon-Repos 24, 1005 Lausanne',
    ST_GeogFromText('POINT(6.6387 46.5229)'),
    true
);

-- Insert sample user preferences
INSERT INTO user_preferences (user_id, notifications, email_updates, share_location, public_profile, auto_accept_requests) VALUES
(
    'e3de7cf1-a7cb-4826-8cc6-02a3963d7629', -- John Doe
    true,  -- notifications
    false, -- email_updates
    true,  -- share_location
    true,  -- public_profile
    false  -- auto_accept_requests
),
(
    '3273f6e2-059f-4c7b-8bc8-fa675c6ac46b', -- Marie Dupont
    true,  -- notifications
    true,  -- email_updates (she likes to stay informed)
    true,  -- share_location
    true,  -- public_profile
    false  -- auto_accept_requests
),
(
    '44e6bc46-a589-4476-9472-d53980d5ea61', -- Peter Schmidt
    false, -- notifications (prefers quiet)
    false, -- email_updates
    true,  -- share_location
    true,  -- public_profile
    true   -- auto_accept_requests (trusting person)
);

-- Verify data integrity
-- Check that we have the expected number of records
DO $$
DECLARE
    user_count INTEGER;
    item_count INTEGER;
    request_count INTEGER;
    preferences_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO user_count FROM users;
    SELECT COUNT(*) INTO item_count FROM items;
    SELECT COUNT(*) INTO request_count FROM borrow_requests;
    SELECT COUNT(*) INTO preferences_count FROM user_preferences;
    
    RAISE NOTICE 'Seed data loaded successfully:';
    RAISE NOTICE '  Users: %', user_count;
    RAISE NOTICE '  Items: %', item_count;
    RAISE NOTICE '  Requests: %', request_count;
    RAISE NOTICE '  Preferences: %', preferences_count;
    
    -- Basic integrity checks
    IF user_count != 3 THEN
        RAISE EXCEPTION 'Expected 3 users, got %', user_count;
    END IF;
    
    IF item_count != 5 THEN
        RAISE EXCEPTION 'Expected 5 items, got %', item_count;
    END IF;
    
    IF preferences_count != 3 THEN
        RAISE EXCEPTION 'Expected 3 user preferences, got %', preferences_count;
    END IF;
    
    RAISE NOTICE 'All integrity checks passed! 🎉';
    
    -- Instructions for creating auth users
    RAISE NOTICE '';
    RAISE NOTICE '🔗 NEXT STEP: Create development auth users';
    RAISE NOTICE '   Run: node create-dev-auth.js';
    RAISE NOTICE '   Or: node supabase/seed_auth_users.js';
    RAISE NOTICE '';
    RAISE NOTICE '🔑 Dev login credentials:';
    RAISE NOTICE '   Email: john@example.com';
    RAISE NOTICE '   Password: password123';
    RAISE NOTICE '';
END $$;