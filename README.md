# SupplyIT Internal Management Dashboard

A comprehensive executive oversight dashboard for SupplyIT B2B logistics SaaS, featuring role-based access control (RBAC), real-time KPIs, budget tracking, milestone management, and team overview.

## Features

### 🔐 Role-Based Access Control (RBAC)
- **12 distinct user roles** with granular permissions
- **Module-based access control** for all dashboard features
- **Secure authentication** with NextAuth.js
- **Route protection** with middleware

### 📊 Dashboard Modules
- **KPI Dashboard** - Real-time metrics and performance indicators
- **Budget Management** - Capital usage tracking and financial oversight
- **Milestone Tracker** - MVP progress and project timeline
- **Team Overview** - Headcount planning and team management
- **Analytics** - Advanced reporting and data visualization
- **Roadmap** - Strategic planning and timeline view

### 🎨 Modern UI/UX
- **Responsive design** for all devices
- **Beautiful gradients** and animations
- **Dark/light mode** support
- **Interactive charts** with Recharts
- **Modern components** with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd supplyit-dashboard
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database (NeonDB recommended)
DATABASE_URL="postgresql://username:password@localhost:5432/supplyit_dashboard"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# For production, generate a strong secret:
# NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with initial data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the dashboard.

## User Roles & Permissions

### Admin Roles
- **FOUNDER** - Full access to all modules
- **SUPER_ADMIN** - Full access to all modules

### Management Roles
- **FINANCE_CONTROLLER** - Budget, financial projections, reports
- **PRODUCT_OWNER** - Milestones, roadmap, KPI updates
- **OPS_MANAGER** - Team planning, delivery metrics
- **TECH_LEAD** - Development progress, infrastructure status
- **STRATEGY_LEAD** - Strategic planning, investor relations
- **SALES_LEAD** - Sales metrics, team planning

### External Roles
- **INVESTOR** - Read-only access to financial and progress data
- **PILOT_CLIENT** - Limited access to KPI dashboard
- **ADVISOR** - Read-only access to most modules
- **TEAM** - Basic read access to team-relevant data

## Demo Credentials

After seeding the database, you can use these credentials:

- **Admin**: `admin@supplyit.io` / `admin123`
- **Finance**: `finance@supplyit.io` / `admin123`
- **Product**: `product@supplyit.io` / `admin123`
- **Operations**: `ops@supplyit.io` / `admin123`
- **Tech**: `tech@supplyit.io` / `admin123`
- **Investor**: `investor@supplyit.io` / `admin123`

## Database Schema

The application uses a comprehensive Prisma schema with:

- **Users** - Authentication and role management
- **Budget** - Financial tracking and allocation
- **Milestones** - Project progress and timelines
- **Team Members** - Headcount and equity management
- **KPIs** - Performance metrics and targets

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js framework

2. **Environment Variables**
   Set these in your Vercel project settings:
   ```env
   DATABASE_URL="your-production-database-url"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   NEXTAUTH_SECRET="your-production-secret"
   PRISMA_GENERATE_DATAPROXY="true"
   ```

3. **Build Settings**
   - Build Command: `npm run build` (automatically includes Prisma generate)
   - Install Command: `npm install`
   - Output Directory: `.next`

4. **Database Setup**
   ```bash
   # Run migrations on production database
   npm run db:migrate
   
   # Seed production data (optional)
   npm run db:seed
   ```

5. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Set up custom domain if needed

### Environment Variables for Production

```env
# Database (NeonDB recommended for Vercel)
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"

# Prisma
PRISMA_GENERATE_DATAPROXY="true"
```

### Troubleshooting

**Prisma Client Error on Vercel:**
- Ensure `prisma generate` runs during build (already configured)
- Check that `DATABASE_URL` is correctly set
- Verify database connection and migrations

**Authentication Issues:**
- Ensure `NEXTAUTH_URL` matches your deployment URL
- Generate a strong `NEXTAUTH_SECRET` for production
- Check that all environment variables are set in Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to SupplyIT. All rights reserved.

## Support

For support, contact the development team or create an issue in the repository.
