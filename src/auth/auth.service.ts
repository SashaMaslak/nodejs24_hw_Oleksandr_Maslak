import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify, hash } from 'argon2';
import { UsersService } from '../users/users.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { ITokens } from './interfaces/tokens.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private initialUser: Omit<CreateUserDto, 'email' | 'password'> = {
    firstName: '',
    lastName: '',
    age: 0,
    isStudent: false,
  };

  constructor(
    private jwt: JwtService,
    private usersService: UsersService,
  ) {}

  private async hashData(data: string): Promise<string> {
    return await hash(data);
  }

  private async getTokens(userId: string) {
    const data = { id: userId };

    const accessToken = await this.hashData(
      this.jwt.sign(data, { expiresIn: '1h' }),
    );

    const refreshToken = await this.hashData(
      this.jwt.sign(data, { expiresIn: '7d' }),
    );

    return { accessToken, refreshToken };
  }

  async signUp(dto: AuthSignUpDto) {
    console.log('dto:', dto);

    let tokens = { accessToken: '', refreshToken: '' };

    const user = this.usersService.findById(dto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // if (user?.password !== dto.password) {
    //   throw new UnauthorizedException('Invalid password');
    // }

    const newUser = this.usersService.create({
      ...this.initialUser,
      ...dto,
    });

    tokens = await this.getTokens(newUser.id);

    this.logger.log(`Going to sign up new user with id: ${newUser.age}`);

    return { newUser, tokens };
  }

  async signIn(dto: AuthSignInDto): Promise<ITokens> {
    let tokens = { accessToken: '', refreshToken: '' };
    const user = this.usersService.findById(dto.email);
    if (user?.password !== dto.password) {
      throw new UnauthorizedException('Invalid password');
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    return tokens;
  }
}
