import { Module } from '@nestjs/common';
import { Product_Controller } from './product.controller';
import { Product_Service } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Entity/product.entity';
import { User_Module } from '../user/user.module';
import { User_Service } from '../user/user.service';
import { User } from '../Entity/users.entity';

@Module({
  imports: [User_Module, TypeOrmModule.forFeature([Product, User])],
  controllers: [Product_Controller],
  providers: [Product_Service, User_Service],
})
export class Product_Module {}
