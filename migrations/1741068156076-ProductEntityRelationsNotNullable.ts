import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductEntityRelationsNotNullable1741068156076
  implements MigrationInterface
{
  name = 'ProductEntityRelationsNotNullable1741068156076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_904b30d0611df66f73164e999db"
        `);
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_32eaa54ad96b26459158464379a"
        `);
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "subcategoryId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "storeId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "userId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_904b30d0611df66f73164e999db" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"
        `);
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_32eaa54ad96b26459158464379a"
        `);
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_904b30d0611df66f73164e999db"
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "userId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "storeId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "subcategoryId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_904b30d0611df66f73164e999db" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
