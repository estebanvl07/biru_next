-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fiexedId" INTEGER;

-- CreateTable
CREATE TABLE "FixedMovements" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "reminder_date" TIMESTAMP(3) NOT NULL,
    "reminder_sent" BOOLEAN NOT NULL,
    "next_ocurrence" TIMESTAMP(3) NOT NULL,
    "last_ocurrence" TIMESTAMP(3) NOT NULL,
    "frecuency" TEXT NOT NULL DEFAULT 'month',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixedMovements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fiexedId_fkey" FOREIGN KEY ("fiexedId") REFERENCES "FixedMovements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
