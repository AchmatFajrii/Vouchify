/*
  Warnings:

  - Added the required column `gameId` to the `vochers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vochers` ADD COLUMN `gameId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `vochers` ADD CONSTRAINT `vochers_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
