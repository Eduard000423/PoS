import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entity/users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { privilegioDto } from 'src/Dto/privilegio.dto';

@Injectable()
export class User_Service {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  listAll() {
    return this.userRepo.find({
      select: { name: true, edad: true, gender: true, rol: true },
      relations: { products: true },
    });
  }

  async findOne(id: number): Promise<User> | null {
    const user = await this.userRepo.findOneBy({ id: id });
    return user;
  }

  addOne(
    name: string,
    edad: number,
    gender: string,
    user: string,
    pass: string,
    privilegios: privilegioDto,
    rol: string,
  ) {
    const new_User = new User(name, edad, gender, user, pass, privilegios, rol);
    this.userRepo.save(new_User);
  }

  async deleteOneById(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete({ id: id });
  }

  updateOneById(id: number, valUpdate: object) {
    this.userRepo.update({ id: id }, valUpdate);
  }
}
