import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDto } from 'src/Dto/users.dto';

@Injectable()
export class JwebTokenService {
  constructor(private readonly jWebTokenService: JwtService) {}

  async GenerateToken(payload): Promise<string> {
    return this.jWebTokenService.sign(payload);
  }

  async VerificarToken(token: string): Promise<UsersDto> {
    try {
      return await this.jWebTokenService.verifyAsync(token);
    } catch (err) {
      throw new HttpException('Token Invalido', HttpStatus.FORBIDDEN);
    }
  }
}
