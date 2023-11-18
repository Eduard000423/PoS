import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { productDTO } from 'src/Dto/products.dto';
import { ObjectId } from 'mongoose';
import { ObjectIdValidator } from 'src/Pipes/ValidateObjectId.pipe';

@Controller('product')
export class Products_Controller {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  listProducts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productService.listProduct(page, limit);
  }
  @Get(':id')
  findOne(@Param('id', ObjectIdValidator) id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Post()
  addProduct(@Body() producto: productDTO) {
    this.productService.addProduct(producto);
    return { status: 'OK' };
  }

  @Delete(':id')
  deleteProduct(@Param('id', ObjectIdValidator) id: ObjectId) {
    this.productService.deleteProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ObjectIdValidator) id: ObjectId,
    @Body() body: productDTO,
  ) {
    this.productService.updateProduct(id, body);
    return { status: 'OK' };
  }
}
