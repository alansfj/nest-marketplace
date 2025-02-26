import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { Store } from './store.entity';

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

  @OneToOne(() => Subcategory)
  @JoinColumn()
  subcategory: Subcategory;

  @OneToOne(() => Store)
  @JoinColumn()
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

  @Column({ default: false })
  @Exclude()
  deleted: boolean;

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
