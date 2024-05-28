/*
  Warnings:

  - You are about to drop the column `savingId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_savingId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "savingId",
ADD COLUMN     "goalId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
