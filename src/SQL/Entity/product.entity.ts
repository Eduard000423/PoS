import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productName: string;
  @Column()
  prize: number;
  @Column()
  category: string;
  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
