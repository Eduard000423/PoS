import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { persona } from './users.schema.';
import mongoose, { Model } from 'mongoose';
import { UsersDto } from 'src/Dto/users.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(persona.name) private userModel: Model<persona>) {}

  findAll(): Promise<persona[]> {
    return this.userModel.find({}, 'name edad gender user rol').exec();
  }

  createUser(data: UsersDto): Promise<persona> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findById(id: mongoose.ObjectId): Promise<persona> {
    const user = await this.userModel
      .findById(id)
      .select('name edad gender user rol');
    console.log(user);
    this.validate(user);
    return user;
  }

  async updateUser(id: mongoose.ObjectId, body: UsersDto) {
    const updated = await this.userModel.findOneAndUpdate({ _id: id }, body);
    this.validate(updated);
    return updated.save();
  }

  async deleteUser(id: mongoose.ObjectId) {
    const user = await this.userModel.findByIdAndDelete(id);
    this.validate(user);
    return user;
  }

  validate(user) {
    if (user == null) {
      throw new HttpException('Usuario no Encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
