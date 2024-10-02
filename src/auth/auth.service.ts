import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UsersService } from '../users/users.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { ITokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwt: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(dto: AuthSignUpDto): Promise<ITokens> {
    let tokens = { accessToken: '', refreshToken: '' };

    const user = this.usersService.findById(dto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    if (user?.password !== dto.password) {
      throw new UnauthorizedException('Invalid password');
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    return tokens;
  }

  // async signIn(dto: AuthSignInDto): Promise<ITokens> {
  //   let tokens = { accessToken: '', refreshToken: '' };
  //   const user = this.usersService.findById(dto.email);
  //   if (user?.password !== dto.password) {
  //     throw new UnauthorizedException('Invalid password');
  //   }
  //   const { password, ...result } = user;
  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object

  //   return tokens;
  // }
}
