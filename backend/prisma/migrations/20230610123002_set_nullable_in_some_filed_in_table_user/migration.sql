-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('Male', 'Female') NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL;
