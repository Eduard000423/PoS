import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { persona } from 'src/users/users.schema.';
import { JwebTokenService } from 'src/Auth/jwebtoken.service';

@Injectable()
export class loginService {
  constructor(
    @InjectModel(persona.name) private userModel: Model<persona>,
    private readonly jwebService: JwebTokenService,
  ) {}

  async logIn(user: string, pass: string) {
    const userFind = await this.userModel.findOne(
      { user: user, pass: pass },
      'user name edad gender rol',
    );
    if (userFind === null) {
      throw new HttpException(
        'Usuario o Contraseña Incorrecta',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.jwebService.GenerateToken({
      user: userFind.user,
      name: userFind.name,
      edad: userFind.edad,
      gender: userFind.gender,
      rol: userFind.rol,
    });
  }
}
