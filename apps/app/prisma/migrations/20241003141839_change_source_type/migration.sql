/*
  Warnings:

  - The values [UPLOAD] on the enum `sources_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `sources` MODIFY `type` ENUM('YOUTUBE', 'AUDIO', 'VIDEO') NOT NULL;
