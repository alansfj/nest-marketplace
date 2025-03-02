import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreTableRemoveDeletedColumn1740882016127
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE store DROP COLUMN deleted;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE store ADD COLUMN deleted BOOLEAN DEFAULT FALSE;`,
    );
  }
}
