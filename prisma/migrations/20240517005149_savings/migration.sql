-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "state" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "entityId" INTEGER,
ALTER COLUMN "state" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "SavingMoves" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "savingId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavingMoves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Savings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "target" INTEGER NOT NULL,
    "saved" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "goalDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Savings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT,
    "type" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavingMoves" ADD CONSTRAINT "SavingMoves_savingId_fkey" FOREIGN KEY ("savingId") REFERENCES "Savings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingMoves" ADD CONSTRAINT "SavingMoves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingMoves" ADD CONSTRAINT "SavingMoves_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "UserAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entities" ADD CONSTRAINT "Entities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
