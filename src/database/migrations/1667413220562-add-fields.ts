import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1667413220562 implements MigrationInterface {
  name = 'addFields1667413220562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
  }
}