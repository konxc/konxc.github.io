ALTER TABLE `verifications` RENAME TO `verification`;--> statement-breakpoint
ALTER TABLE `accounts` ADD `created_at` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `updated_at` integer DEFAULT (unixepoch()) NOT NULL;