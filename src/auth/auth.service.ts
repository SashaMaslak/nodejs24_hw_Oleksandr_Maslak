import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify, hash } from 'argon2';
import { UsersService } from '../users/users.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { ITokens } from './interfaces/tokens.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PartialUpdateUserDto } from 'src/users/dto/partial-update-user.dto';

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

  async getNewTokens(userId: string, refreshToken: string): Promise<ITokens> {
    this.logger.log(`Going to generate tokens for user with id: ${userId}`);

    let tokens = { accessToken: '', refreshToken: '' };

    const user = this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    tokens = await this.getTokens(user.id);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    const updateUserDto: PartialUpdateUserDto = {
      refreshToken: hashedRefreshToken,
    };

    this.usersService.findByIdAndUpdate(userId, updateUserDto);
  }

  public async signUp(body: AuthSignUpDto): Promise<ITokens> {
    let tokens = { accessToken: '', refreshToken: '' };

    const user = this.usersService.findById(body.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const { password, ...data } = body;
    const hashedPassword = await this.hashData(password);

    const newUser = this.usersService.create({
      ...this.initialUser,
      ...data,
      password: hashedPassword,
    });

    tokens = await this.getTokens(newUser.id);

    this.logger.log(`Going to sign UP new user with id: ${newUser.email}`);

    return tokens;
  }

  private async validateUser(candidate: AuthSignInDto) {
    const user = this.usersService.findByEmail(candidate.email);

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await verify(user.password, candidate.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    return user;
  }

  public async signIn(body: AuthSignInDto): Promise<ITokens> {
    let tokens = { accessToken: '', refreshToken: '' };
    const user = await this.validateUser(body);

    tokens = await this.getTokens(user.id);

    this.logger.log(`Going to sign IN new user with id: ${user.email}`);

    return tokens;
  }

  async logOut(userId: string) {
    return this.usersService.findByIdAndUpdate(userId, { refreshToken: '' });
  }
}
