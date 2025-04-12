-- AlterTable
ALTER TABLE "FixedMovements" ADD COLUMN     "goalId" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FixedMovements" ADD CONSTRAINT "FixedMovements_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
