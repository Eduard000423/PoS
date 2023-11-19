import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './users/users.module';
import { loginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { MassiveModule } from './MassiveLoadUp/massive.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DB_URL'),
        };
      },
      inject: [ConfigService],
    }),
    Users,
    ProductsModule,
    loginModule,
    MassiveModule,
  ],
})
export class AppModule {}
