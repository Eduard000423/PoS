import { Module } from '@nestjs/common';
import { MassiveController } from './massive.controller';
import { MassiveService } from './massive.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, product } from 'src/products/products.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [MassiveController],
  providers: [MassiveService],
  imports: [
    MongooseModule.forFeature([{ name: product.name, schema: ProductSchema }]),
    MulterModule.register({ dest: './tempLoad' }),
  ],
})
export class MassiveModule {}
