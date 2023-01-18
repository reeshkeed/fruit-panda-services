import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IFruits } from './interface/fruits.interface';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';

@Injectable()
export class FruitsService {
  constructor(@InjectModel('Fruits') private fruitsModel: Model<IFruits>) {}

  /**
   * Fruit creation service
   * @param createFruitDto object payload
   * @returns fruit object
   */
  async create(createFruitDto: CreateFruitDto): Promise<IFruits> {
    const newFruit = await new this.fruitsModel(createFruitDto);

    return newFruit.save();
  }

  /**
   * Find fruit service
   * @param id string ObjectId
   * @returns fruit object
   */
  async findOne(id: ObjectId) {
    const fruit = await this.fruitsModel.findById(id);

    return fruit;
  }

  /**
   * Get all fruits list service
   * @returns all fruits
   */
  async getAll() {
    const fruits = await this.fruitsModel.find();

    return fruits;
  }

  /**
   * Find by id & update fruit data service
   * @param id string ObjectId
   * @param updateFruitDto payload data
   * @returns fruit object
   */
  async update(id: string, updateFruitDto: UpdateFruitDto) {
    // set new: true to return data after update applied
    const fruit = await this.fruitsModel.findByIdAndUpdate(id, updateFruitDto, {
      new: true,
    });

    return fruit;
  }
}
