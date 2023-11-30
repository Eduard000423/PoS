import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Product_Service } from './product.service';
import { productDTO } from 'src/Dto/products.dto';

@Controller('product')
export class Product_Controller {
  constructor(private readonly productService: Product_Service) {}

  @Post()
  addProducto(
    @Body('id', new ParseIntPipe()) idUser: number,
    @Body('product') product: productDTO,
  ) {
    this.productService.addProduct(idUser, product);
  }
  @Get()
  listAll(@Param('limit') limit: number, @Param('offset') offset: number) {
    return this.productService.list_All_Products(offset, limit);
  }
}
