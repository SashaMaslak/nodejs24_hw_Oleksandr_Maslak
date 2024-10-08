import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.logger = new Logger(UsersService.name);
  }

  async create(dto: CreateUserDto): Promise<User> {
    this.logger.log('Creating user.');

    const newUser = new this.userModel(dto);

    this.logger.log(`Created user ${newUser}.`);

    return newUser.save();
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userModel.deleteOne({ _id: id });

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByIdAndReplace(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findById(id).exec();

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { ...existingUser, ...dto },
          {
            new: true,
          },
        )
        .exec();

      return updatedUser;
    } catch (error) {
      return error;
    }
  }

  async findByIdAndUpdate(
    id: string,
    dto: PartialUpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();

    return updatedUser;
  }
}
