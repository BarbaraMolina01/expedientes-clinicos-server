CREATE TABLE `MAdmin` (
	`id_adm` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`id_user` int NOT NULL,
	`createdAt_adm` timestamp DEFAULT (now()),
	`updateAt_adm` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `MAntecedentesFamiliares` (
	`id_antFam` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`pad_antFam` boolean NOT NULL,
	`mad_antFam` boolean NOT NULL,
	`abueloPat_antFam` boolean NOT NULL,
	`abueloMat_antFam` boolean NOT NULL,
	`tios_antFam` boolean NOT NULL,
	`otros_antFam` text,
	`id_pac` int NOT NULL,
	`createdAt_antFam` timestamp DEFAULT (now()),
	`updateAt_antFam` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `MEspecialista` (
	`id_esp` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`id_user` int NOT NULL,
	`id_per` int NOT NULL,
	`createdAt_esp` timestamp DEFAULT (now()),
	`updateAt_esp` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `CEstadoCivil` (
	`id_estCiv` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`nombre_estCiv` varchar(50) NOT NULL,
	`createdAt_estCiv` timestamp DEFAULT (now()),
	`updateAt_estCiv` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `MUser` (
	`id_user` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email_user` text NOT NULL,
	`password_user` text NOT NULL,
	`id_rol` int NOT NULL,
	`createdAt_user` timestamp DEFAULT (now()),
	`updateAt_user` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `MPaciente` (
	`id_pac` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`tel_pac` varchar(10) NOT NULL,
	`domi_pac` text NOT NULL,
	`lugarNac_pac` text NOT NULL,
	`dni_pac` text NOT NULL,
	`ocup_pac` text NOT NULL,
	`desocPorAd_pac` boolean NOT NULL,
	`religion_pac` text NOT NULL,
	`sepPorAd_pac` boolean NOT NULL,
	`fechaIng_pac` timestamp NOT NULL,
	`parent_pac` text NOT NULL,
	`id_user` int NOT NULL,
	`id_per` int NOT NULL,
	`persResp_pac` int NOT NULL,
	`eval_pac` int NOT NULL,
	`id_estCiv` int NOT NULL,
	`id_suc` int NOT NULL,
	`createdAt_pac` timestamp DEFAULT (now()),
	`updateAt_pac` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `MPersona` (
	`id_per` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`nombre_per` text NOT NULL,
	`appat_per` text NOT NULL,
	`apmat_per` text NOT NULL,
	`fechaNac_per` timestamp NOT NULL,
	`id_sex` int NOT NULL,
	`createdAt_per` timestamp DEFAULT (now()),
	`updateAt_per` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `CRol` (
	`id_rol` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`nombre_rol` varchar(50) NOT NULL,
	`createdAt_rol` timestamp DEFAULT (now()),
	`updateAt_rol` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `CSexo` (
	`id_sex` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`nombre_sex` varchar(50) NOT NULL,
	`createdAt_sex` timestamp DEFAULT (now()),
	`updateAt_sex` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `CSucursal` (
	`id_suc` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`nombre_suc` varchar(100) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updateAt` timestamp DEFAULT (now()));
--> statement-breakpoint
ALTER TABLE `MAdmin` ADD CONSTRAINT `MAdmin_id_user_MUser_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `MUser`(`id_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MAntecedentesFamiliares` ADD CONSTRAINT `MAntecedentesFamiliares_id_pac_MPaciente_id_pac_fk` FOREIGN KEY (`id_pac`) REFERENCES `MPaciente`(`id_pac`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MEspecialista` ADD CONSTRAINT `MEspecialista_id_user_MUser_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `MUser`(`id_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MEspecialista` ADD CONSTRAINT `MEspecialista_id_per_MPersona_id_per_fk` FOREIGN KEY (`id_per`) REFERENCES `MPersona`(`id_per`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MUser` ADD CONSTRAINT `MUser_id_rol_CRol_id_rol_fk` FOREIGN KEY (`id_rol`) REFERENCES `CRol`(`id_rol`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPaciente` ADD CONSTRAINT `MPaciente_id_user_MUser_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `MUser`(`id_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPaciente` ADD CONSTRAINT `MPaciente_id_per_MPersona_id_per_fk` FOREIGN KEY (`id_per`) REFERENCES `MPersona`(`id_per`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPaciente` ADD CONSTRAINT `MPaciente_persResp_pac_MEspecialista_id_esp_fk` FOREIGN KEY (`persResp_pac`) REFERENCES `MEspecialista`(`id_esp`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPaciente` ADD CONSTRAINT `MPaciente_eval_pac_MEspecialista_id_esp_fk` FOREIGN KEY (`eval_pac`) REFERENCES `MEspecialista`(`id_esp`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPaciente` ADD CONSTRAINT `MPaciente_id_estCiv_CEstadoCivil_id_estCiv_fk` FOREIGN KEY (`id_estCiv`) REFERENCES `CEstadoCivil`(`id_estCiv`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPaciente` ADD CONSTRAINT `MPaciente_id_suc_CSucursal_id_suc_fk` FOREIGN KEY (`id_suc`) REFERENCES `CSucursal`(`id_suc`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `MPersona` ADD CONSTRAINT `MPersona_id_sex_CSexo_id_sex_fk` FOREIGN KEY (`id_sex`) REFERENCES `CSexo`(`id_sex`) ON DELETE no action ON UPDATE no action;