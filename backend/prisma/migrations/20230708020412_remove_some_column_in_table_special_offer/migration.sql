/*
  Warnings:

  - You are about to drop the column `from` on the `specialOffers` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `specialOffers` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `specialOffers` table. All the data in the column will be lost.
  - You are about to drop the column `voucherId` on the `specialOffers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `specialOffers` DROP FOREIGN KEY `specialOffers_voucherId_fkey`;

-- AlterTable
ALTER TABLE `specialOffers` DROP COLUMN `from`,
    DROP COLUMN `price`,
    DROP COLUMN `to`,
    DROP COLUMN `voucherId`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
