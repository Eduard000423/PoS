import { Module } from '@nestjs/common';
import { Products_Controller } from './products.controller';
import { ProductSchema, product } from './products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: product.name, schema: ProductSchema }]),
  ],
  controllers: [Products_Controller],
  providers: [ProductService],
})
export class ProductsModule {}
