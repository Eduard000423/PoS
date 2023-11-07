import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { productDTO } from 'src/Dto/products.dto';
import { ObjectId } from 'mongoose';

@Controller('product')
export class Products_Controller {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  listProducts() {
    return this.productService.listProduct();
  }
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Post()
  addProduct(@Body() producto: productDTO) {
    this.productService.addProduct(producto);
    return { status: 'OK' };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: ObjectId) {
    this.productService.deleteProduct(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: ObjectId, @Body() body: productDTO) {
    this.productService.updateProduct(id, body);
    return { status: 'OK' };
  }
}
