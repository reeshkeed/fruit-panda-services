import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { ICarts } from './interface/carts.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CartsService {
  constructor(@InjectModel('Carts') private cartsModel: Model<ICarts>) {}

  /**
   * Cart creation service
   * @param createCartDto object payload
   * @returns cart object
   */
  async create(createCartDto: CreateCartDto): Promise<ICarts> {
    const newCart = await new this.cartsModel(createCartDto);

    return newCart.save();
  }
}
