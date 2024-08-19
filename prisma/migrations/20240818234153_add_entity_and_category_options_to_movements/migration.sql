-- AlterTable
ALTER TABLE "FixedMovements" ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "entityId" INTEGER;

-- AddForeignKey
ALTER TABLE "FixedMovements" ADD CONSTRAINT "FixedMovements_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedMovements" ADD CONSTRAINT "FixedMovements_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
