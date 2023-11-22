import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { loginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller()
export class loginController {
  constructor(private loginservice: loginService) {}
  @Post('login')
  logIn(
    @Body('user', ValidationPipe) user: string,
    @Body('pass', ValidationPipe) pass: string,
  ) {
    return this.loginservice.logIn(user, pass);
  }
}
