import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthLogoutDto } from './dto/auth-log-out.dto';
import { User } from 'src/database-abstraction/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() dto: AuthSignUpDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() dto: AuthSignInDto): Promise<User> {
    return this.authService.signIn(dto);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Body() dto: AuthLogoutDto): Promise<void> {
    await this.authService.logOut(dto.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(@Req() req: Request): Promise<void> {
    const userId = req.user?.sub;
    const refreshToken = req.user?.refreshToken;
    this.authService.refreshTokens(userId, refreshToken);
  }
}
