-- AlterTable
ALTER TABLE "FixedMovements" ALTER COLUMN "type" SET DEFAULT 1,
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "reminder_sent" DROP NOT NULL,
ALTER COLUMN "reminder_sent" SET DEFAULT true,
ALTER COLUMN "last_ocurrence" DROP NOT NULL;
