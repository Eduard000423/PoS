import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './users/users.module';
import { loginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/prueba?authSource=admin', {
      user: 'admin',
      pass: 'admin',
    }),
    Users,
    ProductsModule,
    loginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
