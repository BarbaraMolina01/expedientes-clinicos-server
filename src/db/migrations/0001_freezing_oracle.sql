ALTER TABLE `MPaciente` MODIFY COLUMN `dni_pac` varchar(8) NOT NULL;--> statement-breakpoint
ALTER TABLE `MEspecialista` ADD `id_suc` int NOT NULL;--> statement-breakpoint
ALTER TABLE `MEspecialista` ADD CONSTRAINT `MEspecialista_id_suc_CSucursal_id_suc_fk` FOREIGN KEY (`id_suc`) REFERENCES `CSucursal`(`id_suc`) ON DELETE no action ON UPDATE no action;