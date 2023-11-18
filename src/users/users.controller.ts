import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersDto } from 'src/Dto/users.dto';
import { UserService } from './users.service';
import { persona } from './users.schema.';
import { privilegioInterceptor } from 'src/Interceptors/users.interceptor';
import mongoose from 'mongoose';
import { ObjectIdValidator } from 'src/Pipes/ValidateObjectId.pipe';
import { Roles } from 'src/Reflectors/role.reflector';
import { checkToken } from 'src/Guards/checkToken.guard';

@Controller('users')
export class userController {
  constructor(private userService: UserService) {}

  @Get() //Listar
  listUsers(
    @Query('page') query: number,
    @Query('limit') limit: number,
  ): Promise<persona[]> {
    return this.userService.findAll(query, limit);
  }

  @Get(':id') //Traer un Usuario dado un Id
  async buscarUser(
    @Param('id', ObjectIdValidator) id: mongoose.ObjectId,
  ): Promise<UsersDto> {
    const usuario = this.userService.findById(id);
    return usuario;
  }

  @Post() //Add un Usuario
  @Roles(['SuperAdmin', 'Admin'])
  @UseGuards(checkToken)
  @UseInterceptors(privilegioInterceptor)
  createUser(@Body() data: UsersDto) {
    this.userService.createUser(data);
  }

  @Patch(':id') //Actualizar un user dado un id
  @Roles(['SuperAdmin', 'Admin', 'Moderador'])
  @UseGuards(checkToken)
  @UseInterceptors(privilegioInterceptor)
  async updateUser(
    @Body() body: UsersDto,
    @Param('id', ObjectIdValidator) id: mongoose.ObjectId,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @Roles(['SuperAdmin'])
  @UseGuards(checkToken)
  deleteUser(@Param('id', ObjectIdValidator) id: mongoose.ObjectId) {
    this.userService.deleteUser(id);
  }
}
