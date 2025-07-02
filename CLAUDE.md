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

🚧 **Current State:**
- **Authentication**: REAL Supabase Auth (Phase 1 ✅)
- **Database**: Schema ready, needs setup (5 min task)
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
- Built scalable internationalization architecture
- Enhanced navigation with better back button visibility
- Established comprehensive project documentation

### **IMMEDIATE TASKS (Before Next Development Session)**
1. **Database Setup** (5 min): Run `/database/schema.sql` in Supabase SQL Editor
2. **Environment Config** (2 min): Update `.env` with real Supabase credentials
3. **Test Auth** (5 min): Verify registration and login work

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