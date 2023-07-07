/*
  Warnings:

  - You are about to drop the column `userId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "userId";
