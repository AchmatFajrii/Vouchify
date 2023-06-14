/*
  Warnings:

  - You are about to drop the column `vocherId` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `vocherId` on the `specialOffers` table. All the data in the column will be lost.
  - You are about to drop the column `vocherId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `vocherTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vochers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `voucherId` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `specialOffers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `discounts` DROP FOREIGN KEY `discounts_vocherId_fkey`;

-- DropForeignKey
ALTER TABLE `specialOffers` DROP FOREIGN KEY `specialOffers_vocherId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_vocherId_fkey`;

-- DropForeignKey
ALTER TABLE `vochers` DROP FOREIGN KEY `vochers_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `vochers` DROP FOREIGN KEY `vochers_vocherTypeId_fkey`;

-- AlterTable
ALTER TABLE `discounts` DROP COLUMN `vocherId`,
    ADD COLUMN `voucherId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `specialOffers` DROP COLUMN `vocherId`,
    ADD COLUMN `voucherId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `vocherId`,
    ADD COLUMN `voucherId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `vocherTypes`;

-- DropTable
DROP TABLE `vochers`;

-- CreateTable
CREATE TABLE `vouchers` (
    `id` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `voucherTypeId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` BIGINT NOT NULL DEFAULT 0,
    `price` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voucherTypes` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `discounts` ADD CONSTRAINT `discounts_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `vouchers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `specialOffers` ADD CONSTRAINT `specialOffers_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `vouchers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_voucherTypeId_fkey` FOREIGN KEY (`voucherTypeId`) REFERENCES `voucherTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `vouchers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
