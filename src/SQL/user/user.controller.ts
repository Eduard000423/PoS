import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { User_Service } from './user.service';
import { privilegioInterceptor } from 'src/Interceptors/users.interceptor';
import { UsersDto } from 'src/Dto/users.dto';
import { ValidateUser } from 'src/Pipes/ValidateUser.pipe';
import { checkIfUserExist } from 'src/Guards/checkIfUserExist.guard';
import { OptionFind } from 'src/Reflectors/optionToFind.reflector';
import { Response_DTO } from 'src/Dto/response.dto';
import { User } from '../Entity/users.entity';

@Controller('users')
export class User_Controller {
  constructor(private readonly userService: User_Service) {}
  @Get()
  async listAll(): Promise<Response_DTO<User[]>> {
    return await this.userService.listAll();
  }

  @Get(':id')
  async findOnebyId(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Response_DTO<User>> {
    return await this.userService.findOne({ id: id });
  }

  @Post()
  @OptionFind('USER')
  @UseGuards(checkIfUserExist)
  @UsePipes(new ValidateUser())
  @UseInterceptors(privilegioInterceptor)
  createuser(
    @Body()
    { name, edad, gender, user, pass, privilegios, rol }: UsersDto,
  ): Promise<Response_DTO<User>> {
    const response = this.userService.addOne(
      name,
      edad,
      gender,
      user,
      pass,
      privilegios,
      rol,
    );
    return response;
  }

  @Delete(':id')
  @OptionFind('ID')
  @UseGuards(checkIfUserExist)
  deleteUser(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Response_DTO<User>> {
    return this.userService.deleteOneById(id);
  }
}
