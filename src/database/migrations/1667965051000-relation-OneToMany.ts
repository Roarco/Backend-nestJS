import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationOneToMany1667965051000 implements MigrationInterface {
  name = 'relationOneToMany1667965051000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "brandId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
  }
}
