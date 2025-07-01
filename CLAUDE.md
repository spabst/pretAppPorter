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
- Complete authentication system (registration + login)
- Settings page with profile management
- Item browsing with 53 predefined items
- Comprehensive testing infrastructure

🚧 **Mock/Demo State:**
- All data is simulated (no real backend)
- Authentication is demo-only
- No data persistence

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
- Solved git repository management and large file issues
- Built scalable internationalization architecture
- Created comprehensive authentication system with proper validation
- Implemented testing infrastructure for authentication workflows
- Enhanced navigation with better back button visibility
- Established project documentation for development context

### Next Steps (When Ready)
- Backend integration planning
- Real API implementation
- Data persistence
- Location services
- Push notifications

### Notes
- Always check `PROJECT_OVERVIEW.md` for complete project context
- Use existing translation keys before creating new ones
- Follow TypeScript patterns established in the codebase
- Test in multiple languages when adding new features