#!/bin/bash

# Pumpipumpe - Complete Development Reset
# This script resets the database and recreates auth users in one command

echo "🔄 Resetting development environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Reset database
echo "🗄️  Resetting database..."
npx supabase db reset

if [ $? -eq 0 ]; then
    print_status "Database reset completed"
else
    echo "❌ Database reset failed"
    exit 1
fi

# Wait for database to be ready
echo ""
echo "⏳ Waiting for database to be ready..."
sleep 2

# Create auth users
echo ""
echo "👥 Creating auth users..."
node create-dev-auth.js

if [ $? -eq 0 ]; then
    print_status "Auth users created successfully"
else
    echo "❌ Failed to create auth users"
    exit 1
fi

echo ""
echo "🎉 Development environment is ready!"
echo "   📱 Your app can now authenticate with:"
echo "   📧 john@example.com / password123"
echo ""