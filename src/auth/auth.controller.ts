import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() dto: AuthSignUpDto) {
    return this.authService.signUp(dto);
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('register')
  // signIn(@Body() dto: AuthSignInDto) {
  //   return this.authService.signIn(dto);
  // }
}
