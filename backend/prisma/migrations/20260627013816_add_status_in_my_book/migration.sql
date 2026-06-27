/*
  Warnings:

  - You are about to drop the column `isReaded` on the `MyBook` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('FECHADO', 'LENDO', 'LIDO');

-- AlterTable
ALTER TABLE "MyBook" DROP COLUMN "isReaded",
ADD COLUMN     "status" "ReadingStatus" NOT NULL DEFAULT 'FECHADO';
