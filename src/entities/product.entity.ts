import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { Store } from './store.entity';
import { User } from './user.entity';

@Entity()
export class Product {
  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.product)
  subcategory: Subcategory;

  @ManyToOne(() => Store, (store) => store.product)
  store: Store;

  @Column('money')
  price: number;

  @Column({ length: 10 })
  currency: string;

  @Column()
  quantity: number;

  @Column({ default: true })
  @Exclude()
  active: boolean;

  @ManyToOne(() => User, (user) => user.product)
  user: User;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
