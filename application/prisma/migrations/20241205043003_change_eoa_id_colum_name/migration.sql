/*
  Warnings:

  - The primary key for the `Eoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Eoa` table. All the data in the column will be lost.
  - Added the required column `address` to the `Eoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Eoa` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`address`);
