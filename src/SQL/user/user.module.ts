import { Module } from '@nestjs/common';
import { User_Controller } from './user.controller';
import { User_Service } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [User_Controller],
  providers: [User_Service],
  exports: [User_Service],
})
export class User_Module {}
