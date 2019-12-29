import {MigrationInterface, QueryRunner} from "typeorm";

export class ShipsEntity1577615707162 implements MigrationInterface {
    name = 'ShipsEntity1577615707162'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `ships` (`id` int NOT NULL AUTO_INCREMENT, `start` int NOT NULL, `end` int NOT NULL, `orientation` enum ('Horizontal', 'Vertical') NOT NULL DEFAULT 'Horizontal', `damage` int NOT NULL, `type` enum ('Battleship', 'Cruiser', 'Destroyer', 'Submarine') NOT NULL DEFAULT 'Battleship', `gameId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ships` ADD CONSTRAINT `FK_2e7fe37bc5d778502fff54075ca` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ships` DROP FOREIGN KEY `FK_2e7fe37bc5d778502fff54075ca`", undefined);
        await queryRunner.query("DROP TABLE `ships`", undefined);
    }

}
