import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed budget categories
  const budgetCategories = [
    {
      category: 'UI/UX Design',
      estimatedCost: 8000,
      notes: 'Wireframes, prototype, feedback loops'
    },
    {
      category: 'Initial Dev Setup',
      estimatedCost: 10000,
      notes: 'Basic frontend/backend, repo setup'
    },
    {
      category: 'Domain & Infra',
      estimatedCost: 5000,
      notes: 'Google Workspace, domain, hosting'
    },
    {
      category: 'Ops & Admin',
      estimatedCost: 2000,
      notes: 'Pre-incorporation tasks, templates, compliance docs'
    }
  ];

  for (const category of budgetCategories) {
    await prisma.budgetCategory.upsert({
      where: { category: category.category },
      update: {},
      create: category
    });
  }

  // Seed milestones
  const milestones = [
    {
      title: 'Design system + wireframes ready',
      targetDate: new Date('2025-10-20'),
      status: 'PENDING'
    },
    {
      title: 'Clickable MVP prototype demo',
      targetDate: new Date('2025-10-30'),
      status: 'PENDING'
    },
    {
      title: 'Stakeholder feedback & alignment',
      targetDate: new Date('2025-11-05'),
      status: 'PENDING'
    },
    {
      title: 'Tech repo and infra setup',
      targetDate: new Date('2025-11-10'),
      status: 'PENDING'
    },
    {
      title: 'Trello roadmap & task assignments',
      targetDate: new Date('2025-11-15'),
      status: 'PENDING'
    },
    {
      title: 'Domain/email/workspace live',
      targetDate: new Date('2025-11-10'),
      status: 'PENDING'
    }
  ];

  for (const milestone of milestones) {
    await prisma.milestone.upsert({
      where: { title: milestone.title },
      update: {},
      create: milestone
    });
  }

  // Seed team members
  const teamMembers = [
    {
      role: 'Founder / PM / Dev',
      involvement: 'Full-time',
      monthlyCost: 0,
      notes: 'Sweat equity, leading dev'
    },
    {
      role: 'UI/UX Intern',
      involvement: 'Part-time',
      monthlyCost: 1000,
      notes: 'On stipend'
    },
    {
      role: 'Freelance Dev',
      involvement: 'Ad-hoc',
      monthlyCost: 1500,
      notes: 'Per-task basis'
    },
    {
      role: 'Advisor',
      involvement: 'Advisory only',
      monthlyCost: 0,
      notes: 'Equity-based contribution'
    }
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { role: member.role },
      update: {},
      create: member
    });
  }

  // Seed initial KPIs
  const kpis = [
    {
      name: "Today's Spend",
      value: 1200,
      unit: 'RM'
    },
    {
      name: 'Total Budget',
      value: 25000,
      unit: 'RM'
    },
    {
      name: 'Milestones Complete',
      value: 1,
      targetValue: 5,
      unit: 'count'
    },
    {
      name: 'Team Members',
      value: 3,
      unit: 'count'
    }
  ];

  for (const kpi of kpis) {
    await prisma.kPI.create({
      data: kpi
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 