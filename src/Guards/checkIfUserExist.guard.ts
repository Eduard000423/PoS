import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response_DTO } from 'src/Dto/response.dto';
import { OptionFind } from 'src/Reflectors/optionToFind.reflector';
import { User } from 'src/SQL/Entity/users.entity';
import { User_Service } from 'src/SQL/user/user.service';

@Injectable()
export class checkIfUserExist implements CanActivate {
  constructor(
    @Inject(User_Service) private readonly userService: User_Service,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const criteria = this.reflector.get(OptionFind, context.getHandler());
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    let response: Response_DTO<User>;
    let founded: boolean;

    if (criteria === 'ID') {
      const id = req.params.id;
      response = await this.userService.findOne({ id: id });
      founded = response.founded;
      if (founded) {
        return true;
      } else
        throw new HttpException(
          'El Usuario No existe en la BD',
          HttpStatus.BAD_REQUEST,
        );
    } else if (criteria === 'USER') {
      response = await this.userService.findOne({ user: req.body.user });
      founded = response.founded;
      if (founded === false) {
        return true;
      } else
        throw new HttpException(
          'El nombre de Usuario ya existe en la base de Datos',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
