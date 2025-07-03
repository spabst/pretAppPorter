# 🏠 Pumpipumpe - Neighborhood Item Sharing App

A React Native mobile app built with Expo that enables neighbors to share and borrow items from each other, promoting sustainable consumption and community building.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- Docker (for local Supabase)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Supabase
```bash
# Start Supabase local development stack
supabase start
```

### 3. Start the App
```bash
npm start
```

Choose your platform:
- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a` 
- **Web Browser**: Press `w`
- **Expo Go**: Scan QR code with Expo Go app

## 🧪 Testing

### Manual Testing
1. Open the app → **Settings Tab** → **About Section** → **🧪 Test Authentication**
2. Follow the comprehensive [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Automated Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🗂 Project Structure

```
pumpipumpe/
├── app/                    # Main application screens (Expo Router)
├── components/             # Reusable UI components
├── contexts/              # React contexts (Auth, Language)
├── services/              # API services (Supabase, Mock)
├── types/                 # TypeScript type definitions
├── data/                  # Static data and predefined items
├── database/              # Database schema and migrations
├── supabase/              # Supabase configuration and migrations
├── __tests__/             # Test files (Jest)
└── docs/                  # Documentation
```

## 🌍 Features

### ✅ Current Features
- **Multi-language Support**: 5 languages (IT, FR, EN, DE, ES)
- **Real Authentication**: Supabase Auth with phone/email + OTP
- **Item Sharing**: Browse and share items with neighbors
- **Geolocation**: PostGIS-powered proximity search
- **Cross-platform**: iOS, Android, Web support

### 🚧 In Development
- **Data Persistence**: Migrations and seed data
- **Testing Infrastructure**: Automated test suite
- **Enhanced UI**: Improved design and accessibility

## 🔧 Development

### Local Development Setup
1. **Supabase**: Local instance runs on `http://127.0.0.1:54321`
2. **Database**: PostgreSQL with PostGIS extension
3. **Auth**: Supabase Auth with OTP verification
4. **Storage**: File upload capabilities

### Environment Configuration
```bash
# .env file (already configured for local development)
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Open Android emulator
- `npm run ios` - Open iOS simulator
- `npm run web` - Open web browser
- `npm test` - Run test suite
- `npm run lint` - Check code quality

## 📋 Development Roadmap

See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for detailed development phases and current progress.

**Current Phase**: Phase 1 (Data Persistence) + Phase 2 (Testing Infrastructure)

## 🤝 Contributing

1. **Development Flow**:
   - Create feature branch
   - Write tests for new functionality
   - Implement features following existing patterns
   - Ensure tests pass and coverage remains high
   - Submit pull request

2. **Code Quality**:
   - TypeScript strict mode
   - ESLint configuration
   - Jest testing
   - 80%+ test coverage goal

3. **Testing Strategy**:
   - Unit tests for services and utilities
   - Component tests for UI elements
   - Integration tests for API calls
   - Manual testing via built-in test interface

## 📖 Documentation

- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Comprehensive testing procedures
- **[PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)** - Development roadmap and phases
- **[CLAUDE.md](./CLAUDE.md)** - Development context and patterns

## 🛠 Tech Stack

- **Frontend**: React Native + Expo SDK 53
- **Backend**: Supabase (PostgreSQL + PostGIS)
- **Authentication**: Supabase Auth
- **Testing**: Jest + React Native Testing Library
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: React Context + Hooks

## 📱 Platforms

- **iOS**: iPhone and iPad support
- **Android**: Phone and tablet support  
- **Web**: Browser compatibility (progressive web app)

## 🌟 Key Features in Detail

### Authentication
- Phone number registration with OTP
- Email/password login
- Social authentication (Google, Facebook, Apple)
- Secure session management

### Item Sharing
- Browse items by category
- Proximity-based search (PostGIS)
- Request borrowing with messages
- Rate and review system (planned)

### Multilingual
- Italian (primary)
- French, English, German, Spanish
- Dynamic language switching
- Complete UI translation

---

**Need Help?** Check the documentation files or open an issue for support.
