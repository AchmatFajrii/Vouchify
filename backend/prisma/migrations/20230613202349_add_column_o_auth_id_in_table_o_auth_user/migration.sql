/*
  Warnings:

  - Added the required column `oAuthId` to the `oAuthUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `oAuthUsers` ADD COLUMN `oAuthId` VARCHAR(191) NOT NULL;
