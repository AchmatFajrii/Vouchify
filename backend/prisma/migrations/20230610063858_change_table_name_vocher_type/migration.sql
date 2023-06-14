/*
  Warnings:

  - You are about to drop the `VocherType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `vochers` DROP FOREIGN KEY `vochers_vocherTypeId_fkey`;

-- DropTable
DROP TABLE `VocherType`;

-- CreateTable
CREATE TABLE `vocherTypes` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vochers` ADD CONSTRAINT `vochers_vocherTypeId_fkey` FOREIGN KEY (`vocherTypeId`) REFERENCES `vocherTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
