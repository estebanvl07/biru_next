/*
  Warnings:

  - Added the required column `lastAccess` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goals" ALTER COLUMN "saved" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UserAccount" ADD COLUMN     "lastAccess" TIMESTAMP(3) NOT NULL;
