/*
  Warnings:

  - You are about to drop the column `srt` on the `subtitles` table. All the data in the column will be lost.
  - Added the required column `data` to the `subtitles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subtitles` DROP COLUMN `srt`,
    ADD COLUMN `data` VARCHAR(191) NOT NULL;
