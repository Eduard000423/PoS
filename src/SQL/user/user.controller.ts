import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User_Service } from './user.service';
import { privilegioInterceptor } from 'src/Interceptors/users.interceptor';
import { UsersDto } from 'src/Dto/users.dto';

@Controller('users')
export class User_Controller {
  constructor(private readonly userService: User_Service) {}
  @Get()
  listAll() {
    return this.userService.listAll();
  }

  @Get(':id')
  async findOnebyId(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.findOne(id);
  }

  @Post()
  @UseInterceptors(privilegioInterceptor)
  createuser(
    @Body()
    { name, edad, gender, user, pass, privilegios, rol }: UsersDto,
  ) {
    this.userService.addOne(name, edad, gender, user, pass, privilegios, rol);
  }
}
