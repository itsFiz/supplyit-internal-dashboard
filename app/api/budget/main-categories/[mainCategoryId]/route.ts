import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ mainCategoryId: string }> }) {
  try {
    const { mainCategoryId } = await params;
    const mainCategoryIdNum = parseInt(mainCategoryId, 10);
    if (isNaN(mainCategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid mainCategoryId' }, { status: 400 });
    }
    const mainCategory = await prisma.budgetMainCategory.findUnique({
      where: { id: mainCategoryIdNum },
      include: { subcategories: true },
    });
    if (!mainCategory) {
      return NextResponse.json({ error: 'Main category not found' }, { status: 404 });
    }
    return NextResponse.json(mainCategory);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch main category' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ mainCategoryId: string }> }) {
  try {
    const { mainCategoryId } = await params;
    const mainCategoryIdNum = parseInt(mainCategoryId, 10);
    if (isNaN(mainCategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid mainCategoryId' }, { status: 400 });
    }
    const { name, totalBudget } = await req.json();
    const updated = await prisma.budgetMainCategory.update({
      where: { id: mainCategoryIdNum },
      data: { name, totalBudget },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update main category' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ mainCategoryId: string }> }) {
  try {
    const { mainCategoryId } = await params;
    const mainCategoryIdNum = parseInt(mainCategoryId, 10);
    if (isNaN(mainCategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid mainCategoryId' }, { status: 400 });
    }
    await prisma.budgetMainCategory.delete({
      where: { id: mainCategoryIdNum },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete main category' }, { status: 500 });
  }
} 