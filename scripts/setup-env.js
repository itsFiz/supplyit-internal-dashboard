#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 SupplyIT Dashboard Environment Setup\n');

// Generate a secure secret
const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64');
};

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local already exists. Skipping creation.');
  console.log('   If you need to regenerate the NEXTAUTH_SECRET, run:');
  console.log('   openssl rand -base64 32\n');
} else {
  const secret = generateSecret();
  const envContent = `# NextAuth.js Configuration
NEXTAUTH_SECRET="${secret}"
NEXTAUTH_URL="http://localhost:3000"

# Database Configuration
# DATABASE_URL="postgresql://username:password@localhost:5432/supplyit_dashboard"

# For production deployment:
# 1. Set NEXTAUTH_SECRET in your hosting platform's environment variables
# 2. Set DATABASE_URL to your production database connection string
# 3. Set NEXTAUTH_URL to your production domain (e.g., https://yourdomain.com)
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local with generated NEXTAUTH_SECRET');
  console.log(`   Secret: ${secret}\n`);
}

console.log('📋 Required Environment Variables for Production:');
console.log('');
console.log('NEXTAUTH_SECRET - Generate with: openssl rand -base64 32');
console.log('NEXTAUTH_URL - Your production domain (e.g., https://yourdomain.com)');
console.log('DATABASE_URL - Your production database connection string');
console.log('');
console.log('🔗 For Vercel deployment:');
console.log('1. Go to your Vercel project settings');
console.log('2. Add the environment variables above');
console.log('3. Redeploy your application');
console.log('');
console.log('🚀 For local development:');
console.log('1. Update DATABASE_URL in .env.local with your database connection');
console.log('2. Run: npm run db:push');
console.log('3. Run: npm run db:seed');
console.log('4. Run: npm run dev'); 