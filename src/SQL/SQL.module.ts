import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/users.entity';
import { Product } from './Entity/product.entity';
import { User_Module } from './user/user.module';
import { Product_Module } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      entities: [User, Product],
      synchronize: true,
    }),
    User_Module,
    Product_Module,
  ],
})
export class SQL_Module {}
