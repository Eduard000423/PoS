import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwebTokenService } from 'src/Auth/jwebtoken.service';
import { UsersDto } from 'src/Dto/users.dto';
import { Roles } from 'src/Reflectors/role.reflector';

@Injectable()
export class checkToken implements CanActivate {
  constructor(
    private jwtService: JwebTokenService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const ctx = context.switchToHttp().getRequest<Request>();
    const auth: string = ctx.headers['authorization'];
    try {
      const bearer = auth.replace('Bearer ', '');
      const token: UsersDto = await this.jwtService.VerificarToken(bearer);
      return roles.includes(token.rol);
    } catch (err) {
      throw new HttpException(
        'No Sent Token or Invalid Token',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
