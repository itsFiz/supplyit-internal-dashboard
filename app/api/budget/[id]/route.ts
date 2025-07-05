import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { canAccessBudget } from '@/lib/rbac';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canAccessBudget(session.user.role, 'READ')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const budgetCategory = await prisma.budgetCategory.findUnique({
      where: { id: parseInt(id) },
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

    if (!budgetCategory) {
      return NextResponse.json({ error: 'Budget category not found' }, { status: 404 });
    }

    return NextResponse.json(budgetCategory);
  } catch (error) {
    console.error('Error fetching budget category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canAccessBudget(session.user.role, 'UPDATE')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { category, estimatedCost, actualCost, notes } = body;

    // Get the current record for audit logging
    const currentRecord = await prisma.budgetCategory.findUnique({
      where: { id: parseInt(id) }
    });

    if (!currentRecord) {
      return NextResponse.json({ error: 'Budget category not found' }, { status: 404 });
    }

    const updatedBudgetCategory = await prisma.budgetCategory.update({
      where: { id: parseInt(id) },
      data: {
        category: category || currentRecord.category,
        estimatedCost: estimatedCost ? parseFloat(estimatedCost) : currentRecord.estimatedCost,
        actualCost: actualCost !== undefined ? parseFloat(actualCost) : currentRecord.actualCost,
        notes: notes !== undefined ? notes : currentRecord.notes,
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

    // Log the update
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        table: 'budget_categories',
        recordId: id,
        oldValues: currentRecord,
        newValues: updatedBudgetCategory,
        userId: session.user.id
      }
    });

    return NextResponse.json(updatedBudgetCategory);
  } catch (error) {
    console.error('Error updating budget category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canAccessBudget(session.user.role, 'DELETE')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get the current record for audit logging
    const currentRecord = await prisma.budgetCategory.findUnique({
      where: { id: parseInt(id) }
    });

    if (!currentRecord) {
      return NextResponse.json({ error: 'Budget category not found' }, { status: 404 });
    }

    await prisma.budgetCategory.delete({
      where: { id: parseInt(id) }
    });

    // Log the deletion
    await prisma.auditLog.create({
      data: {
        action: 'DELETE',
        table: 'budget_categories',
        recordId: id,
        oldValues: currentRecord,
        userId: session.user.id
      }
    });

    return NextResponse.json({ message: 'Budget category deleted successfully' });
  } catch (error) {
    console.error('Error deleting budget category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 