/*
  Warnings:

  - The `frecuency` column on the `FixedMovements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FixedMovements" DROP COLUMN "frecuency",
ADD COLUMN     "frecuency" INTEGER NOT NULL DEFAULT 30;
