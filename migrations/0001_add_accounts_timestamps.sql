-- Add created_at and updated_at columns to accounts table
ALTER TABLE `accounts` ADD COLUMN `created_at` integer DEFAULT (unixepoch()) NOT NULL;
ALTER TABLE `accounts` ADD COLUMN `updated_at` integer DEFAULT (unixepoch()) NOT NULL;
