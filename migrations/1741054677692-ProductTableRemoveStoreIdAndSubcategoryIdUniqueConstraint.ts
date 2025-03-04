import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTableRemoveStoreIdAndSubcategoryIdUniqueConstraint1741054677692
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE product
            DROP CONSTRAINT IF EXISTS "REL_904b30d0611df66f73164e999d";

            ALTER TABLE product
            DROP CONSTRAINT IF EXISTS "REL_32eaa54ad96b26459158464379";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
