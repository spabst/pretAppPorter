# 🚀 Production Deployment Guide

## Overview
This guide walks you through deploying Pumpipumpe to production with a hosted Supabase instance.

## 📋 Prerequisites
- Node.js and npm installed
- Expo CLI installed (`npm install -g @expo/cli`)
- Supabase account (sign up at https://supabase.com)
- Apple Developer Account (for iOS) or Google Play Console (for Android)

## 🔧 Setup Process

### Step 1: Create Production Supabase Project

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Click "New project"
   
2. **Configure Project**
   - Organization: Choose or create one
   - Name: `pumpipumpe-prod` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes ~2 minutes
   - Note down the project URL and API keys

### Step 2: Configure Environment Variables

1. **Copy Environment Template**
   ```bash
   cp .env.example .env.production
   ```

2. **Update Production Values**
   ```bash
   # Edit .env.production
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   ```

3. **Get Your Values from Supabase**
   - Go to Project Settings → API
   - Copy "Project URL" and "anon/public" key

### Step 3: Deploy Database Schema

1. **Link to Production Project**
   ```bash
   npx supabase link --project-ref your-project-ref
   ```

2. **Push Database Schema**
   ```bash
   npx supabase db push
   ```

3. **Verify Tables Created**
   - Check Supabase Dashboard → Table Editor
   - Should see: users, items, borrow_requests, user_preferences

### Step 4: Set Up Authentication

1. **Configure Auth Settings**
   - Go to Authentication → Settings
   - Site URL: Set to your app's domain
   - Redirect URLs: Add your app's deep links

2. **Configure Email Templates** (Optional)
   - Go to Authentication → Email Templates
   - Customize registration/reset emails

### Step 5: Build and Deploy App

#### For Expo Development Build

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Create Production Build**
   ```bash
   # For iOS
   eas build --platform ios --profile production
   
   # For Android
   eas build --platform android --profile production
   ```

#### For Expo Go (Development/Testing)

1. **Publish Update**
   ```bash
   expo publish --release-channel production
   ```

### Step 6: Environment-Specific Configuration

The app automatically detects environment:
- **Development**: Uses local Supabase (127.0.0.1)
- **Production**: Uses hosted Supabase (your-project.supabase.co)

## 🔒 Security Checklist

### Database Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Proper policies for user data access
- ✅ Foreign key constraints in place

### Auth Security
- ✅ Email confirmation enabled
- ✅ Secure password requirements
- ✅ JWT token expiration configured

### App Security
- ✅ Environment variables not exposed in code
- ✅ Dev-only features hidden in production
- ✅ API keys properly scoped (anon key only)

## 📊 Monitoring and Maintenance

### Supabase Dashboard
- Monitor Database → Reports for usage
- Check Authentication → Users for user activity
- Review API → Logs for errors

### App Analytics
- Set up analytics service (Firebase, Mixpanel, etc.)
- Monitor crash reporting
- Track user engagement metrics

## 🐛 Troubleshooting

### Common Issues

1. **Environment Detection Problems**
   ```bash
   # Check logs for environment info
   expo start --dev-client
   # Look for "🔧 Supabase initialized in [mode]"
   ```

2. **Database Connection Issues**
   - Verify Supabase project is active
   - Check environment variables are correct
   - Ensure database is accessible (not paused)

3. **Authentication Not Working**
   - Verify Site URL in Supabase Auth settings
   - Check redirect URLs are configured
   - Ensure email confirmation is set correctly

4. **Migration Issues**
   ```bash
   # Reset and reapply migrations
   npx supabase db reset
   npx supabase db push
   ```

## 🔄 Updates and Maintenance

### Database Updates
1. Create new migration files
2. Test locally with `supabase db reset`
3. Deploy with `supabase db push`

### App Updates
1. Update code
2. Test with production environment variables
3. Build and deploy new version

### Backup Strategy
- Supabase automatically backs up database
- Export user data regularly via Dashboard
- Keep migration files in version control

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev/docs

## 🎯 Production Checklist

Before going live:
- [ ] Production Supabase project created
- [ ] Database schema deployed
- [ ] Authentication configured
- [ ] Environment variables set
- [ ] App built for production
- [ ] Security policies tested
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] User onboarding flow tested
- [ ] Error handling verified

## 🚀 Post-Launch

1. **Monitor Performance**
   - Watch database usage
   - Monitor API response times
   - Track authentication success rates

2. **User Feedback**
   - Set up feedback collection
   - Monitor app store reviews
   - Track support requests

3. **Scaling Considerations**
   - Monitor concurrent users
   - Consider database indexing optimizations
   - Plan for storage growth

---

**Ready for Production!** 🎉

Your Pumpipumpe app is now configured for production deployment with proper environment detection, security, and monitoring.