import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { canAccessBudget } from '@/lib/rbac';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!canAccessBudget(session.user.role, 'READ')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    const budgetCategories = await prisma.budgetCategory.findMany({
      orderBy: { id: 'asc' },
      include: {
        updatedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    return NextResponse.json(budgetCategories);
  } catch (error) {
    console.error('Error fetching budget categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!canAccessBudget(session.user.role, 'CREATE')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    const body = await request.json();
    const { category, estimatedCost, actualCost, notes } = body;
    if (!category || estimatedCost === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newBudgetCategory = await prisma.budgetCategory.create({
      data: {
        category,
        estimatedCost: parseFloat(estimatedCost),
        actualCost: actualCost !== undefined ? parseFloat(actualCost) : 0,
        notes: notes || '',
        updatedById: session.user.id
      },
      include: {
        updatedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    // Optionally, add audit log here
    return NextResponse.json(newBudgetCategory, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating budget category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}

export function HEAD() {
  return NextResponse.json({}, { status: 405 });
} 