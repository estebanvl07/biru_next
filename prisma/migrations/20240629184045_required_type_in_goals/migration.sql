/*
  Warnings:

  - Made the column `type` on table `Goals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Goals" ALTER COLUMN "type" SET NOT NULL;
