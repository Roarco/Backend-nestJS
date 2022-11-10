import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationManyToMany1668044725863 implements MigrationInterface {
  name = 'relationManyToMany1668044725863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_products_product" ("categoryId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_0b4e34a45516284987c6dbe91cd" PRIMARY KEY ("categoryId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_90d521137ff8c3e927187bcd27" ON "category_products_product" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee240b247f9f23e5d35854c186" ON "category_products_product" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_90d521137ff8c3e927187bcd27d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_ee240b247f9f23e5d35854c186b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_ee240b247f9f23e5d35854c186b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_90d521137ff8c3e927187bcd27d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee240b247f9f23e5d35854c186"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_90d521137ff8c3e927187bcd27"`,
    );
    await queryRunner.query(`DROP TABLE "category_products_product"`);
  }
}
