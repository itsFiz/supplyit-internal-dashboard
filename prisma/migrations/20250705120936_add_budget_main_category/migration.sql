-- CreateTable
CREATE TABLE "BudgetMainCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalBudget" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetMainCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetSubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION NOT NULL,
    "actualCost" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "mainCategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetSubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BudgetSubCategory" ADD CONSTRAINT "BudgetSubCategory_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "BudgetMainCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
