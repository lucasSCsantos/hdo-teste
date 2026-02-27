/*
  Warnings:

  - You are about to drop the column `birthDate` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "patients_cpf_key";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "birthDate",
DROP COLUMN "cpf",
ADD COLUMN     "document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patients_document_key" ON "patients"("document");
