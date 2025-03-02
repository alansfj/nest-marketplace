import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @OneToMany(() => Store, (store) => store.user)
  stores: Store[];

  @Column()
  @Exclude()
  password: string;
}
