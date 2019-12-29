import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1577608029257 implements MigrationInterface {
    name = 'InitialMigration1577608029257'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `games` (`id` varchar(36) NOT NULL, `playerRole` enum ('Attacker', 'Defender') NOT NULL DEFAULT 'Attacker', PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `games`", undefined);
    }

}
