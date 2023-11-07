import { Module } from '@nestjs/common';
import { JwebTokenService } from './jwebtoken.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from './SECRET.json';

@Module({
  imports: [
    JwtModule.register({ secret: SECRET, signOptions: { algorithm: 'HS256' } }),
  ],
  providers: [JwebTokenService],
  exports: [JwtModule, JwebTokenService],
})
export class AuthModule {}
