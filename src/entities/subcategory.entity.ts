import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity()
export class Subcategory {
  constructor(partial: Partial<Subcategory>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  product: Product;
}
