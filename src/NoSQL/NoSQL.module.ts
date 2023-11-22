import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { loginModule } from './login/login.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DB_URL'),
        };
      },
      inject: [ConfigService],
    }),
    ProductsModule,
    UsersModule,
    loginModule,
  ],
})
export class NoSQLModule {}
