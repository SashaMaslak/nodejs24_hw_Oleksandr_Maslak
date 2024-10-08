import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export abstract class AbstractService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: Partial<T>): Promise<T> {
    const createdEntity = new this.model(createDto);
    return await createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<T> {
    const entity = await this.model.findById(id).exec();
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    const updatedEntity = await this.model
      .findByIdAndUpdate(id, updateDto, {
        new: true,
      })
      .exec();

    if (!updatedEntity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return updatedEntity;
  }

  async remove(id: string): Promise<void> {
    const entity = await this.model.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    await this.model.deleteOne({ _id: id });
  }
}
