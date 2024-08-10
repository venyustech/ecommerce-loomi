/*
  Warnings:

  - Added the required column `ownerId` to the `ecommerce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ecommerce" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ecommerce" ADD CONSTRAINT "ecommerce_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
