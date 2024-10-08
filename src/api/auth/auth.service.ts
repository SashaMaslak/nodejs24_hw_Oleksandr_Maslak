import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { verify, hash } from 'argon2';
import { UsersService } from '../users/users.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { ITokens } from './interfaces/tokens.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PartialUpdateUserDto } from '../users/dto/partial-update-user.dto';
import { User } from '../users/schemas/user.schema';

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
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  private async hashData(data: string): Promise<string> {
    return await hash(data);
  }

  private async getTokens(userId: string, email: string) {
    const data = { id: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_SECRET_EXPIRE'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_SECRET_EXPIRE',
          ),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async getNewTokens(userId: string, refreshToken: string): Promise<ITokens> {
    this.logger.log(`Going to generate tokens for user with id: ${userId}`);

    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    await this.refreshTokens(user.id.toString(), refreshToken);

    const tokens = await this.getTokens(user.id.toString(), user.email);
    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    const updateUserDto: PartialUpdateUserDto = {
      refreshToken: hashedRefreshToken,
    };

    await this.usersService.findByIdAndUpdate(userId, updateUserDto);
  }

  public async signUp(body: AuthSignUpDto): Promise<User> {
    const existingUser = await this.usersService.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const { password, ...data } = body;

    const newUser: User = await this.usersService.create({
      ...this.initialUser,
      ...data,
      password,
    });

    this.logger.log(`Going to sign UP new user with id: ${newUser.email}`);

    return await this.usersService.findById(newUser.id);
  }

  private async validateUser(candidate: AuthSignInDto) {
    const user = await this.usersService.findByEmail(candidate.email);

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await verify(user.password, candidate.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    return user;
  }

  public async signIn(body: AuthSignInDto): Promise<User> {
    const candidate = await this.validateUser(body);
    const tokens = await this.getTokens(candidate.id, candidate.email);
    try {
      const user = await this.usersService.findByIdAndUpdate(candidate.id, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      this.logger.log(`Going to sign IN user with id: ${user.id}`);

      return await this.usersService.findById(user.id);
    } catch (error) {
      return error;
    }
  }

  async logOut(userId: string) {
    this.logger.log(`Going to Log Out user with id: ${userId}`);
    await this.usersService.findByIdAndUpdate(userId, { refreshToken: '' });
  }
}
