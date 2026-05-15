-- AlterTable
ALTER TABLE "users" ADD COLUMN     "googleRefreshToken" TEXT,
ADD COLUMN     "googleSyncEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "timezone" TEXT;
