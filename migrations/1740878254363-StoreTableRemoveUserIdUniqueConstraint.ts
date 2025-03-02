import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreTableRemoveUserIdUniqueConstraint1740878254363
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE store
        DROP CONSTRAINT IF EXISTS "REL_3f82dbf41ae837b8aa0a27d29c";
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
