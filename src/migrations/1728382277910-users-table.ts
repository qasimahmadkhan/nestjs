import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1728382277910 implements MigrationInterface {
    name = 'UsersTable1728382277910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
