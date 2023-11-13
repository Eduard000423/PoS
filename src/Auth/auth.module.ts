import { Module } from '@nestjs/common';
import { JwebTokenService } from './jwebtoken.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

//const secret = ConfigService.prototype.get('SECRET');
//onsole.log(secret);

@Module({
  imports: [
    JwtModule.registerAsync({
      //Halle La solucion en @nestjs/jwt
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwebTokenService],
  exports: [JwtModule, JwebTokenService],
})
export class AuthModule {
  constructor() {}
}
