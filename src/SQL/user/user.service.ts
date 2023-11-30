import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entity/users.entity';
import { Repository } from 'typeorm';
import { privilegioDto } from 'src/Dto/privilegio.dto';
import { Response_DTO } from 'src/Dto/response.dto';
import { findOption } from 'src/Dto/findOption.dto';

@Injectable()
export class User_Service {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async listAll(): Promise<Response_DTO<User[]>> {
    const list = await this.userRepo.find({
      select: { name: true, edad: true, gender: true, rol: true },
      relations: { products: true },
    });
    return { status: HttpStatus.OK, message: 'Lista de Usuarios', data: list };
  }

  async findOne(findOption: findOption): Promise<Response_DTO<User>> {
    const search = await this.userRepo.find({
      select: {
        name: true,
        edad: true,
        gender: true,
        rol: true,
      },
      relations: { products: true },
      where: findOption,
    });
    const user: User = search[0];

    if (user) {
      return {
        status: HttpStatus.FOUND,
        message: 'Usuario Encontrado',
        data: user,
        founded: true,
      };
    }
    return {
      status: HttpStatus.NOT_FOUND,
      message: 'Usuario no encontrado',
      data: null,
      founded: false,
    };
  }

  async addOne(
    name: string,
    edad: number,
    gender: string,
    user: string,
    pass: string,
    privilegios: privilegioDto,
    rol: string,
  ): Promise<Response_DTO<User>> {
    const new_User = new User(name, edad, gender, user, pass, privilegios, rol);
    this.userRepo.save(new_User);
    return {
      status: HttpStatus.CREATED,
      message: `Usuario ${new_User.name} Creado con Exito`,
    };
  }

  async deleteOneById(id: number): Promise<Response_DTO<User>> {
    const exists = await this.exist(id);
    if (exists) {
      await this.userRepo.delete({ id: id });
      return {
        status: HttpStatus.FOUND,
        message: 'Usuario Eliminado con Exito',
      };
    } else {
      return { status: HttpStatus.NOT_FOUND, message: 'Usuario no Encontrado' };
    }
  }

  async updateOneById(
    id: number,
    valUpdate: object,
  ): Promise<Response_DTO<User>> {
    this.userRepo.update({ id: id }, valUpdate);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Usuario Añadido con Exito',
    };
  }

  async exist(id: number): Promise<boolean> {
    return await this.userRepo.exist({ where: { id: id } });
  }
}
