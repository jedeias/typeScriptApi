/*
  Warnings:

  - You are about to drop the column `userTypeId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `usertype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userTypeId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userTypeId`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `usertype`;
