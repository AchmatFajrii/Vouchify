/*
  Warnings:

  - You are about to drop the `oAuthLoginHistories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oAuthLogins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `oAuthLoginHistories` DROP FOREIGN KEY `oAuthLoginHistories_oAuthLoginId_fkey`;

-- DropForeignKey
ALTER TABLE `oAuthLogins` DROP FOREIGN KEY `oAuthLogins_userId_fkey`;

-- DropTable
DROP TABLE `oAuthLoginHistories`;

-- DropTable
DROP TABLE `oAuthLogins`;
