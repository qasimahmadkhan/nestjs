import { MigrationInterface, QueryRunner } from "typeorm";

export class UPDATEUSERTABLECOLUMNS1728907132054 implements MigrationInterface {
    name = 'UPDATEUSERTABLECOLUMNS1728907132054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordExpires" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordExpires"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`);
    }

}
