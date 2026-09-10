/*
  Warnings:

  - You are about to drop the `carro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `concessionaria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `carro`;

-- DropTable
DROP TABLE `concessionaria`;

-- CreateTable
CREATE TABLE `estoque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem` VARCHAR(255) NOT NULL,
    `item` VARCHAR(255) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `sala` VARCHAR(255) NOT NULL,
    `dataHora` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
