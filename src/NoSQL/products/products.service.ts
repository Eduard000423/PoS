import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { product } from './products.schema';
import { productDTO } from 'src/Dto/products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(product.name) private productModel: Model<product>,
  ) {}

  async listProduct(page: number, limit: number): Promise<productDTO[]> {
    return await this.productModel
      .find({}, {}, { limit: limit, skip: limit * (page - 1) })
      .exec();
  }

  async findOne(id: ObjectId) {
    return await this.productModel.findById(id);
  }
  addProduct(product: productDTO) {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async updateProduct(id: ObjectId, product: productDTO) {
    await this.productModel.findByIdAndUpdate({ _id: id }, product);
  }

  async deleteProduct(id: ObjectId) {
    await this.productModel.findByIdAndDelete(id);
  }
}
