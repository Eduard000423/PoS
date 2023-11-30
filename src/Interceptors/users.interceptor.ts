import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as roles from './roleConstants';
import { Observable } from 'rxjs';
import { UsersDto } from 'src/Dto/users.dto';

@Injectable()
export class privilegioInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const [req] = context.getArgs();
    const data: UsersDto = req.body;
    switch (data.rol) {
      case 'Cliente':
        data.privilegios = roles.CLIENT;
        break;
      case 'Moderador':
        data.privilegios = roles.MODERATOR;
        break;
      case 'Admin':
        data.privilegios = roles.ADMIN;
        break;
      case 'SuperAdmin':
        data.privilegios = roles.SUPERADMIN;
        break;
    }
    return next.handle();
  }
}
