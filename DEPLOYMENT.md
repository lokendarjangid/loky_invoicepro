# InvoicePro Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lokendarjangid/loky_invoicepro)

## Step-by-Step Deployment

### 1. Database Setup (Neon - Free)

1. Go to [Neon](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string (it looks like: `postgresql://user:pass@host.neon.tech:5432/database`)
5. Save it for step 4

### 2. Authentication Setup (Clerk - Free)

1. Go to [Clerk](https://clerk.com)
2. Create a free account
3. Create a new application
4. Go to API Keys in the dashboard
5. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
6. In Settings → Paths, configure:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

### 3. Payment Setup (Stripe - Optional)

1. Go to [Stripe](https://stripe.com)
2. Create account (use test mode for development)
3. Go to Developers → API Keys
4. Copy:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

### 4. Deploy to Vercel

1. Push this repo to your GitHub account
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:

```
DATABASE_URL=your_neon_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

6. Click "Deploy"
7. Wait 2-3 minutes
8. Your app is live! 🎉

### 5. Configure Clerk After Deployment

1. Go back to Clerk dashboard
2. Update URLs with your Vercel domain:
   - Authorized domains: Add `your-app.vercel.app`

### 6. Test Your Deployment

1. Visit your Vercel URL
2. Sign up for an account
3. Create a client
4. Create an invoice
5. Done! 🚀

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Make sure DATABASE_URL is from Neon (must be PostgreSQL)

### Authentication Not Working
- Verify Clerk keys are correct
- Check that redirect URLs match in Clerk dashboard

### Database Errors
- Run `npx prisma db push` locally first to test connection
- Make sure DATABASE_URL includes `?sslmode=require`

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

## Need Help?

Open an issue on [GitHub](https://github.com/lokendarjangid/loky_invoicepro/issues)
