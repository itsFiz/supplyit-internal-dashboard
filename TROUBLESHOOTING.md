# Troubleshooting Guide

## NextAuth.js NO_SECRET Error

### Problem
```
[next-auth][error][NO_SECRET] Please define a `secret` in production.
Error [MissingSecretError]: Please define a `secret` in production.
```

### Solution

#### For Local Development
1. Run the setup script:
   ```bash
   npm run setup
   ```
   This will create a `.env.local` file with a generated secret.

2. Or manually create `.env.local`:
   ```env
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   DATABASE_URL="your-database-url"
   ```

#### For Production (Vercel)
1. Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

2. Add environment variables in Vercel:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add the following variables:
     - `NEXTAUTH_SECRET`: (paste the generated secret)
     - `NEXTAUTH_URL`: `https://your-domain.vercel.app`
     - `DATABASE_URL`: (your production database URL)

3. Redeploy your application

### Quick Fix Commands

```bash
# Generate a secret
openssl rand -base64 32

# Setup local environment
npm run setup

# Check environment variables
echo $NEXTAUTH_SECRET
echo $DATABASE_URL
```

## Database Connection Issues

### Problem
```
Error: connect ECONNREFUSED
```

### Solution
1. Verify your `DATABASE_URL` is correct
2. Ensure your database is running and accessible
3. Check firewall settings
4. For NeonDB: Verify the connection string format

## Authentication Issues

### Problem
- Users can't sign in
- Session errors
- Redirect loops

### Solution
1. Verify `NEXTAUTH_URL` matches your deployment URL exactly
2. Check that `NEXTAUTH_SECRET` is set and consistent
3. Ensure database is properly seeded with user data
4. Check browser console for errors

## Common Environment Variables

```env
# Required for all environments
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000" # or your production URL
DATABASE_URL="postgresql://..."

# Optional
PRISMA_GENERATE_DATAPROXY="true" # For Vercel
```

## Vercel-Specific Issues

### Build Failures
1. Ensure `prisma generate` runs during build (already configured)
2. Check that all environment variables are set
3. Verify database connection string

### Runtime Errors
1. Check Vercel function logs
2. Verify environment variables are accessible
3. Ensure database is accessible from Vercel's servers

## Getting Help

1. Check the logs in your hosting platform
2. Verify all environment variables are set
3. Test locally with the same environment variables
4. Check the NextAuth.js documentation: https://next-auth.js.org/ 