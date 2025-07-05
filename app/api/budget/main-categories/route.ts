import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const mainCategories = await prisma.budgetMainCategory.findMany({
      include: { subcategories: true },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(mainCategories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch main categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, totalBudget } = await req.json();
    if (!name || typeof totalBudget !== 'number') {
      return NextResponse.json({ error: 'Name and totalBudget are required' }, { status: 400 });
    }
    const mainCategory = await prisma.budgetMainCategory.create({
      data: { name, totalBudget },
    });
    return NextResponse.json(mainCategory);
  } catch {
    return NextResponse.json({ error: 'Failed to create main category' }, { status: 500 });
  }
} 