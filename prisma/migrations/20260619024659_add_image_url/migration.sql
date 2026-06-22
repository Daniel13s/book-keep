/*
  Warnings:

  - Added the required column `imageUrl` to the `MyBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "MyBook" ADD COLUMN     "imageUrl" TEXT NOT NULL;
