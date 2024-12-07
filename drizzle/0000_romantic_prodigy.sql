CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`nickname` text NOT NULL,
	`password_hash` text NOT NULL,
	`token` text,
	`token_expires` date,
	`is_email_verified` integer DEFAULT false NOT NULL,
	`is_online` integer DEFAULT false NOT NULL,
	`user_level` integer NOT NULL,
	`created_at` date NOT NULL,
	`updated_at` date NOT NULL,
	`profile_image` text NOT NULL
);
