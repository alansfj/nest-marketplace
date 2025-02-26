import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;
}
