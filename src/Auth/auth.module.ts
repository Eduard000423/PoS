import { Module } from '@nestjs/common';
import { JwebTokenService } from './jwebtoken.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { algorithm: 'HS256' },
    }),
  ],
  providers: [JwebTokenService],
  exports: [JwtModule, JwebTokenService],
})
export class AuthModule {}
