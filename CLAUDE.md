# Claude Development Context

## Project: Pumpipumpe - Neighborhood Item Sharing App

### Quick Overview
Pumpipumpe is a React Native mobile app built with Expo that enables neighbors to share and borrow items from each other, promoting sustainable consumption and community building.

### Tech Stack
- **React Native** with **Expo SDK 53**
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Cross-platform**: iOS, Android, Web

### Key Project Files
- `PROJECT_OVERVIEW.md` - Complete project documentation and status
- `TESTING_GUIDE.md` - Authentication testing instructions
- `app/auth-demo.tsx` - Testing interface for authentication
- `app/(tabs)/settings.tsx` - Settings page with testing access
- `contexts/LanguageContextV2.tsx` - Internationalization system

### Current Status
✅ **Completed Features:**
- Multilingual support (IT, FR, EN, DE, ES)
- **REAL Supabase Authentication System** (registration + login with OTP)
- **Complete Backend Infrastructure** (PostGIS, database schema, security)
- Settings page with profile management
- Item browsing with 53 predefined items
- **Authentication Context & Route Protection**
- Comprehensive testing infrastructure
- **Persistent Development Auth System** (auto-recreates after resets)

🚧 **Current State:**
- **Authentication**: REAL Supabase Auth (Phase 1 ✅)
- **Database**: Complete with persistent schema and seed data
- **Data**: Still mock in UI, backend ready for migration
- **MVP Status**: Phase 1 complete, Phase 2 ready to start

### Important Commands
```bash
# Run development server
npm start

# Run on specific platforms
npm run ios
npm run android
npm run web

# Type checking (if available)
npm run typecheck

# Linting (if available)
npm run lint

# Database management
npm run db:reset        # Reset database with migrations and seeds
npm run db:setup        # Create development auth users
npm run db:reset-dev    # Complete reset: database + auth users
npm run db:test         # Test auth and database connectivity
```

### Testing Access
Navigate to: **Settings Tab → About Section → 🧪 Test Authentication**

### Key Development Patterns
- Use `useLanguage()` hook for translations: `t('key.subkey')`
- Follow existing component patterns in `/components`
- Use themed components: `ThemedText`, `ThemedView`
- All new features should support all 5 languages

### Recent Accomplishments
- **PHASE 1 COMPLETED**: Full backend migration to Supabase
- **Authentication**: Migrated from mock to real Supabase Auth with OTP
- **Database**: Complete PostGIS schema with geolocation support
- **Infrastructure**: AuthContext, route protection, session management
- **Security**: Row Level Security, environment protection
- **Persistent Development Auth**: Auto-recreates dev users after database resets
- Built scalable internationalization architecture
- Enhanced navigation with better back button visibility
- Established comprehensive project documentation

### **READY FOR DEVELOPMENT**
✅ **Setup Complete**: Database schema, seed data, and persistent auth system ready
✅ **Quick Start**: Run `npm run db:reset-dev` to reset everything or `npm run db:setup` to create auth users
✅ **Test Authentication**: Login with `john@example.com` / `password123` or use Quick Dev Login

### **Development Auth System**
- **Schema & Seed Data**: Persist automatically across database resets
- **Auth Users**: Need to be recreated after each `supabase db reset`
- **One-Command Reset**: `npm run db:reset-dev` handles everything
- **Manual Setup**: `npm run db:setup` creates auth users after reset
- **Testing**: `npm run db:test` verifies complete auth flow

### Next Development Session (Phase 2)
- Implement real item CRUD operations
- PostGIS proximity search functionality  
- Replace mock data with real Supabase calls
- Image upload with Supabase Storage
- Basic exchange request workflow

### Future Phases
- QR code approval system
- Stripe payment integration
- Push notifications
- Partner locations

### Notes
- Always check `PROJECT_OVERVIEW.md` for complete project context
- Use existing translation keys before creating new ones
- Follow TypeScript patterns established in the codebase
- Test in multiple languages when adding new features