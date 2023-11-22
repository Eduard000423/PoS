import { Module } from '@nestjs/common';
import { Products_Controller } from './products.controller';
import { ProductSchema, product } from './products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './products.service';
import { MassiveModule } from 'src/NoSQL/MassiveLoadUp/massive.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: product.name, schema: ProductSchema }]),
    MassiveModule,
  ],
  controllers: [Products_Controller],
  providers: [ProductService],
})
export class ProductsModule {}
