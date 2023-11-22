import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { persona, UsersSchema } from './users.schema.';
import { userController } from './users.controller';
import { UserService } from './users.service';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: persona.name, schema: UsersSchema }]),
    AuthModule,
  ],
  controllers: [userController],
  providers: [UserService],
})
export class UsersModule {}
