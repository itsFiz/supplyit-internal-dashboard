import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing users and team members
  await prisma.teamMember.deleteMany({});
  await prisma.user.deleteMany({});

  // Create real team users
  const hashedPassword = await bcrypt.hash('supplyit2024', 12);
  
  // Founders
  const founders = [
    {
      email: 'fiz@supplyit.io',
      name: 'Fiz',
      role: 'FOUNDER' as const,
      password: hashedPassword,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      email: 'muhaimin@supplyit.io',
      name: 'Muhaimin',
      role: 'FOUNDER' as const,
      password: hashedPassword,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  ];

  // Team Members
  const teamMembers = [
    {
      email: 'arif@supplyit.io',
      name: 'Arif',
      role: 'FOUNDING_TEAM' as const,
      password: hashedPassword,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    {
      email: 'irfan@supplyit.io',
      name: 'Irfan',
      role: 'FOUNDING_TEAM' as const,
      password: hashedPassword,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      email: 'luqman@supplyit.io',
      name: 'Luqman',
      role: 'FOUNDING_TEAM' as const,
      password: hashedPassword,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    },
  ];

  // Create all users
  const allUsers = [...founders, ...teamMembers];
  
  for (const userData of allUsers) {
    await prisma.user.create({
      data: {
        ...userData,
        emailVerified: new Date(),
        lastLogin: new Date(),
      },
    });
  }

  // Note: Budget data is now seeded separately using seed-budget.ts
  // with the new nested main category/subcategory structure

  // Create sample milestones
  const milestoneData = [
    {
      title: 'MVP Development',
      description: 'Core platform development',
      status: 'IN_PROGRESS' as const,
      targetDate: new Date('2024-03-31'),
    },
    {
      title: 'Beta Testing',
      description: 'Internal beta testing phase',
      status: 'PENDING' as const,
      targetDate: new Date('2024-04-15'),
    },
    {
      title: 'Pilot Client Onboarding',
      description: 'First 3 pilot clients',
      status: 'COMPLETED' as const,
      targetDate: new Date('2024-02-28'),
      completedAt: new Date('2024-02-28'),
    },
    {
      title: 'Investor Pitch Deck',
      description: 'Prepare Series A pitch',
      status: 'IN_PROGRESS' as const,
      targetDate: new Date('2024-05-01'),
    },
  ];

  for (const milestone of milestoneData) {
    await prisma.milestone.create({
      data: milestone,
    });
  }

  // Create real team members data
  const teamData = [
    {
      role: 'CEO & CTO',
      name: 'Fiz',
      involvement: 'Full-time',
      monthlyCost: 0,
      notes: 'Founder, leading development and strategy',
    },
    {
      role: 'COO',
      name: 'Muhaimin',
      involvement: 'Full-time',
      monthlyCost: 0,
      notes: 'Co-founder, operations and business development',
    },
    {
      role: 'CRO',
      name: 'Irfan',
      involvement: 'Part-time',
      monthlyCost: 2000,
      notes: 'Strategic relationships and investor relations',
    },
    {
      role: 'CLO',
      name: 'Luqman',
      involvement: 'Full-time',
      monthlyCost: 3000,
      notes: 'Logistics operations and delivery network',
    },
    {
      role: 'CE',
      name: 'Arif',
      involvement: 'Part-time',
      monthlyCost: 1500,
      notes: 'Brand evangelism and public relations',
    },
  ];

  for (const member of teamData) {
    await prisma.teamMember.create({
      data: member,
    });
  }

  // Create sample KPIs
  const kpiData = [
    {
      name: 'Monthly Active Users',
      value: 150,
      targetValue: 500,
      unit: 'users',
    },
    {
      name: 'Revenue',
      value: 25000,
      targetValue: 100000,
      unit: 'USD',
    },
    {
      name: 'Customer Satisfaction',
      value: 4.2,
      targetValue: 4.5,
      unit: 'rating',
    },
    {
      name: 'Delivery Success Rate',
      value: 95,
      targetValue: 98,
      unit: '%',
    },
  ];

  for (const kpi of kpiData) {
    await prisma.kPI.create({
      data: kpi,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('👥 Real team users created:');
  console.log('   Founders: fiz@supplyit.io, muhaimin@supplyit.io');
  console.log('   Team Members: arif@supplyit.io, irfan@supplyit.io, luqman@supplyit.io');
  console.log('🔑 Password for all users: supplyit2024');
  console.log('💡 Run "npx tsx prisma/seed-budget.ts" to seed budget data');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 