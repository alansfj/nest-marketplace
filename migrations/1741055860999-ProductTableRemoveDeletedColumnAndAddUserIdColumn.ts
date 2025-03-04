import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTableRemoveDeletedColumnAndAddUserIdColumn1741055860999
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE product 
        DROP COLUMN "deleted",
        ADD COLUMN "userId" INTEGER NOT NULL;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE product 
        ADD COLUMN "deleted" BOOLEAN DEFAULT FALSE,
        DROP COLUMN "userId";
    `);
  }
}
