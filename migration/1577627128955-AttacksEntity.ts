import {MigrationInterface, QueryRunner} from "typeorm";

export class AttacksEntity1577627128955 implements MigrationInterface {
    name = 'AttacksEntity1577627128955'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `attacks` (`id` int NOT NULL AUTO_INCREMENT, `position` int NOT NULL, `result` enum ('miss', 'hit') NOT NULL DEFAULT 'miss', `hitShipId` int NULL, `gameId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `attacks` ADD CONSTRAINT `FK_5caca8ed4579b26e6f562328d90` FOREIGN KEY (`hitShipId`) REFERENCES `ships`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `attacks` ADD CONSTRAINT `FK_320fe03c1449cd4b1b20220ff00` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `attacks` DROP FOREIGN KEY `FK_320fe03c1449cd4b1b20220ff00`", undefined);
        await queryRunner.query("ALTER TABLE `attacks` DROP FOREIGN KEY `FK_5caca8ed4579b26e6f562328d90`", undefined);
        await queryRunner.query("DROP TABLE `attacks`", undefined);
    }

}
