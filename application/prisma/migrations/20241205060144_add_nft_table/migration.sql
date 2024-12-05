/*
  Warnings:

  - You are about to drop the column `ExpirationTime` on the `Nonce` table. All the data in the column will be lost.
  - Added the required column `expirationTime` to the `Nonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nonce` DROP COLUMN `ExpirationTime`,
    ADD COLUMN `expirationTime` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Nft` (
    `tokenId` INTEGER NOT NULL,
    `contractAddress` VARCHAR(191) NOT NULL,
    `ownerAddress` VARCHAR(191) NULL,
    `nftType` ENUM('NONE', 'BASIC') NOT NULL DEFAULT 'NONE',

    PRIMARY KEY (`tokenId`, `contractAddress`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
