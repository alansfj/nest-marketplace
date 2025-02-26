import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';

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
}
