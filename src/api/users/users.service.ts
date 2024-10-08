import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'argon2';
import { User, UserDocument } from './schemas/user.schema';
import { AbstractService } from '../../database/abstract.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService extends AbstractService<UserDocument> {
  private readonly logger: Logger;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
    this.logger = new Logger(UsersService.name);
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    this.logger.log('Creating user.');

    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = new this.userModel({ ...dto, password: hashedPassword });

    this.logger.log(`Created user ${newUser}.`);
    return await newUser.save();
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userModel.deleteOne({ _id: id });
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByIdAndReplace(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { ...existingUser.toObject(), ...dto },
        { new: true },
      )
      .exec();

    return updatedUser;
  }

  async findByIdAndUpdate(
    id: string,
    dto: PartialUpdateUserDto,
  ): Promise<UserDocument> {
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

  async changePassword(id: string, newPassword: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hashedPassword = await this.hashPassword(newPassword);
    user.password = hashedPassword;

    return await user.save();
  }
}
