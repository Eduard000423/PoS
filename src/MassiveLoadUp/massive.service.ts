import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from 'src/products/products.schema';

@Injectable()
export class MassiveService {
  constructor(
    @InjectModel(product.name) private productModel: Model<product>,
  ) {}

  massive(excel) {
    
  }
}
