import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { privilegioDto } from 'src/Dto/privilegio.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  edad: number;
  @Column()
  gender: string;
  @PrimaryColumn({ unique: true })
  user: string;
  @Column()
  pass: string;
  @Column('json')
  privilegios: privilegioDto;
  @Column()
  rol: string;
  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
  constructor(
    name: string,
    edad: number,
    gender: string,
    user: string,
    pass: string,
    privilegios: privilegioDto,
    rol: string,
  ) {
    this.privilegios = privilegios;
    this.name = name;
    this.edad = edad;
    this.gender = gender;
    this.user = user;
    this.pass = pass;
    this.rol = rol;
  }
}
