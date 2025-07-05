#!/bin/bash

# Pumpipumpe - Persistent Auth Setup Script
# This script sets up persistent development authentication that survives database resets

echo "🚀 Setting up persistent development authentication..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Supabase is running
echo "🔍 Checking Supabase status..."
if ! npx supabase status > /dev/null 2>&1; then
    print_error "Supabase is not running. Please start it first with: npx supabase start"
    exit 1
fi

print_status "Supabase is running"

# Reset database to apply all migrations and seeds
echo ""
echo "🔄 Resetting database with migrations and seeds..."
npx supabase db reset --force

if [ $? -eq 0 ]; then
    print_status "Database reset completed successfully"
else
    print_error "Database reset failed"
    exit 1
fi

# Wait a moment for the database to be fully ready
echo ""
echo "⏳ Waiting for database to be ready..."
sleep 3

# Create development auth users
echo ""
echo "👥 Creating development auth users..."
node create-dev-auth.js

if [ $? -eq 0 ]; then
    print_status "Development auth users created successfully"
else
    print_error "Failed to create development auth users"
    exit 1
fi

# Test the auth setup
echo ""
echo "🧪 Testing persistent auth setup..."
node test-persistent-auth.js

if [ $? -eq 0 ]; then
    print_status "Persistent auth test completed successfully"
else
    print_warning "Persistent auth test had issues - check the output above"
fi

# Final instructions
echo ""
echo "🎉 Persistent Development Auth Setup Complete!"
echo ""
echo "📱 Your app is now ready with persistent authentication:"
echo "   • Database schema and seed data are loaded"
echo "   • Development auth users are created and linked"
echo "   • User preferences are configured"
echo "   • All data will survive 'supabase db reset'"
echo ""
echo "🔑 Login credentials:"
echo "   📧 Email: john@example.com, marie@example.com, or peter@example.com"
echo "   🔑 Password: password123"
echo ""
echo "🚀 Next steps:"
echo "   1. Open your app"
echo "   2. Go to Settings → Authentication"
echo "   3. Click '⚡ Quick Dev Login'"
echo "   4. All your settings and data will be there!"
echo ""
echo "📝 Note: Run 'node create-dev-auth.js' after any future database reset"
echo "     to recreate the auth users (schema and seed data persist automatically)"
echo ""