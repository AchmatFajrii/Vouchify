/*
  Warnings:

  - Added the required column `vocherTypeId` to the `vochers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vochers` ADD COLUMN `value` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `vocherTypeId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `VocherType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vochers` ADD CONSTRAINT `vochers_vocherTypeId_fkey` FOREIGN KEY (`vocherTypeId`) REFERENCES `VocherType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
