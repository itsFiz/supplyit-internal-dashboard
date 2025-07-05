import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding budget main categories and subcategories...');

  // Clear existing budget data
  await prisma.budgetSubCategory.deleteMany();
  await prisma.budgetMainCategory.deleteMany();

  // Budget data according to the specified structure
  const budgetData = [
    {
      name: 'Product & Tech Development',
      totalBudget: 11000,
      subcategories: [
        {
          name: 'UI/UX Design (Freelancer or Intern Stipends)',
          estimatedCost: 2500,
          actualCost: 0,
          notes: 'Freelancer or intern stipends for UI/UX design work'
        },
        {
          name: 'Frontend Development (React/Next.js)',
          estimatedCost: 3000,
          actualCost: 0,
          notes: 'React/Next.js frontend development costs'
        },
        {
          name: 'Backend Development (Node.js/Express/Python)',
          estimatedCost: 3000,
          actualCost: 0,
          notes: 'Node.js/Express/Python backend development'
        },
        {
          name: 'Testing, Hosting, and Infrastructure (AWS, GitHub, etc.)',
          estimatedCost: 2500,
          actualCost: 0,
          notes: 'AWS, GitHub, and other infrastructure costs'
        }
      ]
    },
    {
      name: 'Company Setup & Admin',
      totalBudget: 3500,
      subcategories: [
        {
          name: 'Sdn Bhd Incorporation Fees & Legal Docs',
          estimatedCost: 1500,
          actualCost: 0,
          notes: 'Company incorporation and legal documentation'
        },
        {
          name: 'IP/Trademark Registration (Initial application)',
          estimatedCost: 500,
          actualCost: 0,
          notes: 'Initial IP and trademark registration application'
        },
        {
          name: 'Google Workspace, Domain, Basic Tools',
          estimatedCost: 1500,
          actualCost: 0,
          notes: 'Google Workspace, domain registration, and basic tools'
        }
      ]
    },
    {
      name: 'Marketing & Branding',
      totalBudget: 3500,
      subcategories: [
        {
          name: 'Landing Page / Microsite (with SEO)',
          estimatedCost: 1000,
          actualCost: 0,
          notes: 'Landing page development with SEO optimization'
        },
        {
          name: 'Brand Identity & Logo Design',
          estimatedCost: 1000,
          actualCost: 0,
          notes: 'Brand identity and logo design services'
        },
        {
          name: 'Pitch Deck, Explainer Video, Promo Materials',
          estimatedCost: 1500,
          actualCost: 0,
          notes: 'Pitch deck, explainer video, and promotional materials'
        }
      ]
    },
    {
      name: 'Client Pilot & GTM Ops',
      totalBudget: 4000,
      subcategories: [
        {
          name: 'Pilot Logistics Cost (Delivery Ops & Testing)',
          estimatedCost: 2000,
          actualCost: 0,
          notes: 'Pilot logistics operations and testing costs'
        },
        {
          name: 'Client Onboarding & Demo Materials',
          estimatedCost: 500,
          actualCost: 0,
          notes: 'Client onboarding process and demo materials'
        },
        {
          name: 'Early Driver Recruitment Incentives',
          estimatedCost: 1500,
          actualCost: 0,
          notes: 'Incentives for early driver recruitment'
        }
      ]
    },
    {
      name: 'Fundraising & Investor Relations',
      totalBudget: 3000,
      subcategories: [
        {
          name: 'Advisory, Legal Review & Grant Application Help',
          estimatedCost: 1500,
          actualCost: 0,
          notes: 'Advisory services, legal review, and grant application assistance'
        },
        {
          name: 'Investor Deck & Financial Projections Services',
          estimatedCost: 1000,
          actualCost: 0,
          notes: 'Investor deck and financial projections services'
        },
        {
          name: 'Travel / Meeting / VC Event Budget',
          estimatedCost: 500,
          actualCost: 0,
          notes: 'Travel, meetings, and VC event budget'
        }
      ]
    }
  ];

  // Create main categories with subcategories
  for (const mainCatData of budgetData) {
    console.log(`📁 Creating main category: ${mainCatData.name}`);
    
    const mainCategory = await prisma.budgetMainCategory.create({
      data: {
        name: mainCatData.name,
        totalBudget: mainCatData.totalBudget
      }
    });

    // Create subcategories for this main category
    for (const subCatData of mainCatData.subcategories) {
      console.log(`  📄 Creating subcategory: ${subCatData.name}`);
      
      await prisma.budgetSubCategory.create({
        data: {
          name: subCatData.name,
          estimatedCost: subCatData.estimatedCost,
          actualCost: subCatData.actualCost,
          notes: subCatData.notes,
          mainCategoryId: mainCategory.id
        }
      });
    }
  }

  // Calculate totals for verification
  const totalBudget = budgetData.reduce((sum, cat) => sum + cat.totalBudget, 0);
  const totalEstimated = budgetData.reduce((sum, cat) => 
    sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.estimatedCost, 0), 0
  );

  console.log('✅ Budget data seeded successfully!');
  console.log('📊 Budget Summary:');
  console.log(`   • Total main category budgets: RM${totalBudget.toLocaleString()}`);
  console.log(`   • Total subcategory estimates: RM${totalEstimated.toLocaleString()}`);
  console.log(`   • Main categories: ${budgetData.length}`);
  console.log(`   • Subcategories: ${budgetData.reduce((sum, cat) => sum + cat.subcategories.length, 0)}`);
  
  // Display breakdown
  budgetData.forEach((cat, index) => {
    const percentage = ((cat.totalBudget / totalBudget) * 100).toFixed(0);
    console.log(`   ${index + 1}. ${cat.name} – RM${cat.totalBudget.toLocaleString()} (${percentage}%)`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding budget data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 