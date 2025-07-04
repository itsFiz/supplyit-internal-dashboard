import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@supplyit.io' },
    update: {},
    create: {
      email: 'admin@supplyit.io',
      name: 'Admin User',
      password: hashedPassword,
      role: 'FOUNDER',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      emailVerified: new Date(),
      lastLogin: new Date(),
    },
  });

  // Create sample users for different roles
  const sampleUsers = [
    {
      email: 'finance@supplyit.io',
      name: 'Finance Controller',
      role: 'FINANCE_CONTROLLER' as const,
      password: hashedPassword,
    },
    {
      email: 'product@supplyit.io',
      name: 'Product Owner',
      role: 'PRODUCT_OWNER' as const,
      password: hashedPassword,
    },
    {
      email: 'ops@supplyit.io',
      name: 'Operations Manager',
      role: 'OPS_MANAGER' as const,
      password: hashedPassword,
    },
    {
      email: 'tech@supplyit.io',
      name: 'Tech Lead',
      role: 'TECH_LEAD' as const,
      password: hashedPassword,
    },
    {
      email: 'investor@supplyit.io',
      name: 'Investor',
      role: 'INVESTOR' as const,
      password: hashedPassword,
    },
  ];

  for (const userData of sampleUsers) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        image: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&${Math.random()}`,
        emailVerified: new Date(),
        lastLogin: new Date(),
      },
    });
  }

  // Create sample budget data
  const budgetData = [
    {
      category: 'Development',
      estimatedCost: 50000,
      actualCost: 32000,
      notes: 'Core platform development and feature implementation',
    },
    {
      category: 'Marketing',
      estimatedCost: 30000,
      actualCost: 15000,
      notes: 'Digital marketing campaigns and brand awareness',
    },
    {
      category: 'Operations',
      estimatedCost: 25000,
      actualCost: 22000,
      notes: 'Operational costs and logistics setup',
    },
    {
      category: 'Legal',
      estimatedCost: 15000,
      actualCost: 8000,
      notes: 'Legal compliance and documentation',
    },
  ];

  for (const budget of budgetData) {
    await prisma.budgetCategory.create({
      data: budget,
    });
  }

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

  // Create sample team members
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
  console.log('👤 Admin user: admin@supplyit.io / admin123');
  console.log('👥 Sample users created for different roles');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 