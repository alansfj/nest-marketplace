import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreTableUserNotNull1740874014765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE store 
       ALTER COLUMN "userId" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE store 
       ALTER COLUMN "userId" DROP NOT NULL;`,
    );
  }
}
