import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ subcategoryId: string }> }) {
  try {
    const { subcategoryId } = await params;
    const subcategoryIdNum = parseInt(subcategoryId, 10);
    if (isNaN(subcategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid subcategoryId' }, { status: 400 });
    }
    const { name, estimatedCost, actualCost, notes } = await req.json();
    const updated = await prisma.budgetSubCategory.update({
      where: { id: subcategoryIdNum },
      data: { name, estimatedCost, actualCost, notes },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ subcategoryId: string }> }) {
  try {
    const { subcategoryId } = await params;
    const subcategoryIdNum = parseInt(subcategoryId, 10);
    if (isNaN(subcategoryIdNum)) {
      return NextResponse.json({ error: 'Invalid subcategoryId' }, { status: 400 });
    }
    await prisma.budgetSubCategory.delete({
      where: { id: subcategoryIdNum },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
} 