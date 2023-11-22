import { Module } from '@nestjs/common';
import { loginService } from './login.service';
import { AuthModule } from 'src/Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, persona } from 'src/NoSQL/users/users.schema.';
import { loginController } from './login.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: persona.name, schema: UsersSchema }]),
  ],
  controllers: [loginController],
  providers: [loginService],
})
export class loginModule {}
