# SupplyIT Internal Dashboard

A centralized internal tool for executive oversight of the SupplyIT project's progress, capital usage, and roadmap.

## Features

- 📊 **KPI Dashboard** - Monitor key performance indicators
- 💰 **Budget Tracking** - Track capital usage and burn rate
- 🎯 **Milestone Management** - Visualize project progress
- 👥 **Team Overview** - Manage hiring plans and key roles
- 📈 **Financial Forecasting** - Project GMV growth and cost structures

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: NeonDB (PostgreSQL) with Prisma ORM
- **Charts**: Recharts
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- NeonDB account
- Vercel account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/itsFiz/supplyit-internal-dashboard.git
   cd supplyit-internal-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your NeonDB connection string:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

4. **Set up the database**
   - Create a new project in NeonDB
   - Copy the connection string to your `.env.local`
   - Generate Prisma client: `npm run db:generate`
   - Push schema to database: `npm run db:push`
   - Seed initial data: `npm run db:seed`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel Setup

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard

2. **Environment Variables in Vercel**
   - `DATABASE_URL`: Your NeonDB connection string
   - `NEXTAUTH_SECRET`: A secure random string
   - `NEXTAUTH_URL`: Your Vercel deployment URL

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Set up custom domain if needed

### NeonDB Setup

1. **Create Database**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **Set up Prisma**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

3. **Optional: View data with Prisma Studio**
   ```bash
   npm run db:studio
   ```

## Project Structure

```
supplyit-dashboard/
├── app/                 # Next.js app directory
├── components/          # React components
├── pages/              # Page components
├── lib/                # Database and utilities
├── data/               # Data files
└── public/             # Static assets
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

Internal use only - NexzGen Strategic Ventures
