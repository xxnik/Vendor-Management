/*
  Warnings:

  - You are about to drop the column `email` on the `Icecream` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Icecream` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Icecream` table. All the data in the column will be lost.
  - Added the required column `price` to the `Icecream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Icecream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Icecream` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Icecream_email_key";

-- AlterTable
ALTER TABLE "Icecream" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "phone",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Icecream" ADD CONSTRAINT "Icecream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
