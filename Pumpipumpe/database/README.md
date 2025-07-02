# Database Setup Guide

## Prerequisites
- Supabase project created (pretapppreter)
- PostGIS extension enabled in Supabase

## Setup Steps

### 1. Configure Environment Variables
1. Copy your Supabase project URL and anon key from Settings → API
2. Update `.env` file with your actual credentials:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Run Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the content from `schema.sql`
4. Click "Run" to execute

This will create:
- All tables (users, items, borrow_requests, user_addresses)
- PostGIS functions for geolocation search
- Row Level Security policies
- Storage bucket for images
- Indexes for performance

### 3. Test with Sample Data (Optional)
1. First, create a test user through your app's registration
2. Note the user ID from the `users` table
3. Update `sample_data.sql` with real user IDs
4. Run the sample data script in SQL Editor

## Database Schema Overview

### Tables
- **users**: User profiles with geolocation
- **items**: Items available for sharing
- **borrow_requests**: Exchange requests between users
- **user_addresses**: Multiple addresses per user

### Key Functions
- **nearby_items(lat, lng, max_distance)**: Find items near a location
- **update_updated_at_column()**: Auto-update timestamps

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public read access for available items
- Secure storage policies for images

## PostGIS Features
- Spatial indexing for fast proximity queries
- Distance calculations in meters
- Support for complex geographical queries

## Storage
- `item-images` bucket for item photos
- Public read access, authenticated write access
- User-specific folders for organization

## Testing the Setup

### Test nearby_items function:
```sql
SELECT * FROM nearby_items(47.3769, 8.5417, 5000, 10);
```

### Test user location queries:
```sql
SELECT name, address, 
       ST_Distance(location, ST_Point(8.5417, 47.3769)::geography) as distance_meters
FROM users 
ORDER BY location <-> ST_Point(8.5417, 47.3769)::geography;
```

## Next Steps
1. Configure your `.env` file
2. Run the schema.sql in Supabase
3. Test user registration through your app
4. Verify geolocation queries work
5. Test image upload to storage