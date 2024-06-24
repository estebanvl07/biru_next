-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "entityId" INTEGER;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
