import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Entity/product.entity';
import { Repository } from 'typeorm';
import { productDTO } from 'src/Dto/products.dto';
import { Response_DTO } from 'src/Dto/response.dto';
import { User_Service } from '../user/user.service';
import { User } from '../Entity/users.entity';

@Injectable()
export class Product_Service {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly userService: User_Service,
  ) {}

  async list_All_Products(
    offset: number = 1,
    limit: number = 2,
  ): Promise<Response_DTO<Product[]>> {
    const product = await this.productRepo.find({
      select: {
        productName: true,
        prize: true,
      },
      skip: limit * (offset - 1),
      take: limit,
    });
    return {
      status: HttpStatus.OK,
      message: 'Listado De Productos en La BD',
      data: product,
    };
  }

  async findOne(id: number): Promise<Response_DTO<Product>> {
    const producto = await this.productRepo.findOneBy({ id: id });
    if (producto) {
      return {
        status: HttpStatus.FOUND,
        message: 'Registro Encontrado',
        data: producto,
      };
    } else
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario No Encontrado',
        data: null,
      };
  }

  async addProduct(
    idUser: number,
    producto: productDTO,
  ): Promise<Response_DTO<Product>> {
    const response = await this.userService.findOne({ id: idUser });
    const user: User = response.data;
    const newProduct = this.productRepo.create(producto);
    newProduct.user = user[0];
    this.productRepo.save(newProduct);

    return {
      status: HttpStatus.CREATED,
      message: 'Producto Añadido con Exito',
    };
  }
}
