import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTableStoreIdAndSubcategoryIdNotNullable1741054890618
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE product 
        ALTER COLUMN "subcategoryId" SET NOT NULL,
        ALTER COLUMN "storeId" SET NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE product 
        ALTER COLUMN "subcategoryId" DROP NOT NULL,
        ALTER COLUMN "storeId" DROP NOT NULL;
`);
  }
}
