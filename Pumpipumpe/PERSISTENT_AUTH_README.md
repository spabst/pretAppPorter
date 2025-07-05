# Persistent Development Authentication System

This document explains how the persistent development authentication system works in Pumpipumpe.

## Overview

The persistent auth system ensures that developers have a consistent authentication experience across database resets while maintaining data integrity and security.

## What Persists vs. What Doesn't

### ✅ **Persists Automatically** (Supabase Database)
- Database schema (tables, columns, indexes)
- Seed data (users, items, preferences)
- Row Level Security (RLS) policies
- Database functions and triggers

### ❌ **Doesn't Persist** (Supabase Auth)
- Auth users (stored in `auth.users` table)
- User sessions and tokens
- Auth-related metadata

## Quick Commands

```bash
# Complete development reset (database + auth users)
npm run db:reset-dev

# Create auth users after manual database reset
npm run db:setup

# Test authentication connectivity
npm run db:test

# Reset database only (manual auth setup required)
npm run db:reset
```

## Development Workflow

### Daily Development
1. Start development: `npm start`
2. If auth issues occur: `npm run db:setup`
3. Test authentication: `npm run db:test`

### After Database Reset
1. Run: `npm run db:reset-dev` (handles everything)
2. Or manually: `npm run db:reset` followed by `npm run db:setup`

### Fresh Environment Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start Supabase: `npx supabase start`
4. Setup development data: `npm run db:reset-dev`

## Development Users

The system creates 3 development users:

| User | Email | Password | Profile Features |
|------|-------|----------|------------------|
| John Doe | john@example.com | password123 | DIY enthusiast, has tools |
| Marie Dupont | marie@example.com | password123 | Cooking lover, kitchen gadgets |
| Peter Schmidt | peter@example.com | password123 | Outdoors person, sports equipment |

## Technical Implementation

### Database Schema
- All migrations in `supabase/migrations/`
- User profiles in `users` table with `auth_id` linking
- User preferences in `user_preferences` table
- Complete seed data in `supabase/seed.sql`

### Auth User Creation
- Script: `create-dev-auth.js`
- Uses Supabase Admin API to create users
- Automatically links to existing profile data
- Handles existing users gracefully

### Testing
- Script: `test-persistent-auth.js`
- Tests login, profile linking, and preferences
- Validates complete authentication flow
- Provides clear success/failure feedback

## Troubleshooting

### "Invalid login credentials" Error
- **Solution**: Run `npm run db:setup` to create auth users
- **Cause**: Auth users were deleted during database reset

### "No authenticated user found" Error
- **Solution**: Ensure auth users exist and are linked to profiles
- **Check**: Run `npm run db:test` to validate setup

### Database Connection Issues
- **Solution**: Restart Supabase with `npx supabase start`
- **Check**: Verify Supabase is running with `npx supabase status`

## Files Overview

### Scripts
- `create-dev-auth.js` - Creates auth users and links to profiles
- `test-persistent-auth.js` - Tests complete auth flow
- `dev-reset.sh` - Complete development reset script
- `setup-persistent-auth.sh` - Initial setup script

### Database
- `supabase/seed.sql` - Persistent seed data
- `supabase/migrations/` - Database schema migrations
- `supabase/config.toml` - Supabase configuration

### Integration
- `contexts/AuthContext.tsx` - Authentication context with real Supabase
- `app/(tabs)/settings.tsx` - Settings page with persistent preferences
- `services/supabaseApi.ts` - API service with real user management

## Production Deployment

For production deployment, the development auth system is automatically disabled. The app uses:
- Real Supabase hosted instance
- Production environment variables
- Real user registration and authentication
- No development users or seed data

See `PRODUCTION_DEPLOYMENT.md` for complete production setup instructions.

## Security Notes

- Development users are only created in local environment
- Production environment automatically disables dev user creation
- All auth credentials are for local development only
- Real production users are managed through Supabase Auth