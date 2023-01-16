import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFruits } from './interface/fruits.interface';
import { CreateFruitDto } from './dto/create-fruit.dto';

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
}
