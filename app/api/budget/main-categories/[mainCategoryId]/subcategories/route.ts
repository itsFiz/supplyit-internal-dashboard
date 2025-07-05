import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ mainCategoryId: string }> }) {
  try {
    const { mainCategoryId } = await params;
    const mainCategoryIdNum = parseInt(mainCategoryId, 10);
    if (isNaN(mainCategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid mainCategoryId' }, { status: 400 });
    }
    const subcategories = await prisma.budgetSubCategory.findMany({
      where: { mainCategoryId: mainCategoryIdNum },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(subcategories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ mainCategoryId: string }> }) {
  try {
    const { mainCategoryId } = await params;
    const mainCategoryIdNum = parseInt(mainCategoryId, 10);
    if (isNaN(mainCategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid mainCategoryId' }, { status: 400 });
    }
    const { name, estimatedCost, actualCost, notes } = await req.json();
    if (!name || typeof estimatedCost !== 'number' || typeof actualCost !== 'number') {
      return NextResponse.json({ error: 'Name, estimatedCost, and actualCost are required' }, { status: 400 });
    }
    const subcategory = await prisma.budgetSubCategory.create({
      data: { name, estimatedCost, actualCost, notes, mainCategoryId: mainCategoryIdNum },
    });
    return NextResponse.json(subcategory);
  } catch {
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
} 