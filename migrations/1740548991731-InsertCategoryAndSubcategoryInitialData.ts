import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCategoryAndSubcategoryInitialData1740548991731
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO category ("name")
       VALUES 
        ('Electronics'),
        ('Clothing'),
        ('Food'),
        ('Home & Kitchen'),
        ('Sports & Outdoors');
       

       INSERT INTO subcategory ("name", "categoryId")
       VALUES 
        ('Smartphones', (SELECT id FROM category WHERE name = 'Electronics')),
        ('Laptops', (SELECT id FROM category WHERE name = 'Electronics')),
        ('Televisions', (SELECT id FROM category WHERE name = 'Electronics')),
        ('Men''s Clothing', (SELECT id FROM category WHERE name = 'Clothing')),
        ('Women''s Clothing', (SELECT id FROM category WHERE name = 'Clothing')),
        ('Footwear', (SELECT id FROM category WHERE name = 'Clothing')),
        ('Snacks', (SELECT id FROM category WHERE name = 'Food')),
        ('Beverages', (SELECT id FROM category WHERE name = 'Food')),
        ('Kitchen Appliances', (SELECT id FROM category WHERE name = 'Home & Kitchen')),
        ('Furniture', (SELECT id FROM category WHERE name = 'Home & Kitchen')),
        ('Gym Equipment', (SELECT id FROM category WHERE name = 'Sports & Outdoors')),
        ('Outdoor Gear', (SELECT id FROM category WHERE name = 'Sports & Outdoors'));
       `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM subcategory WHERE "categoryId" IN 
            (SELECT id FROM category WHERE name IN 
                ('Electronics', 'Clothing', 'Food', 'Home & Kitchen', 'Sports & Outdoors'));

        DELETE FROM category WHERE name IN 
            ('Electronics', 'Clothing', 'Food', 'Home & Kitchen', 'Sports & Outdoors');
    `);
  }
}
