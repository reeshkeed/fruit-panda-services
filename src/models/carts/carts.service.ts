import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { ICarts } from './interface/carts.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AddFruitToCartDto } from './dto/add-fruit.dto';
import { FruitsService } from '../fruits/fruits.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel('Carts') private cartsModel: Model<ICarts>,
    private fruitsService: FruitsService,
  ) {}

  /**
   * Cart creation service
   * @param createCartDto object payload
   * @returns cart object
   */
  async create(createCartDto: CreateCartDto): Promise<ICarts> {
    const newCart = await new this.cartsModel(createCartDto);

    return newCart.save();
  }

  /**
   * Find cart service
   * @param id string ObjectId
   * @returns cart object
   */
  async getCart(userId: string) {
    const cart = await this.cartsModel.find({ userId }).exec();

    return cart;
  }

  /**
   * Add item to cart service
   * @param cartId user cartId
   * @param addFruitToCartDto add item object
   * @returns returns cart data
   */
  async addItem(
    cartId: string,
    addFruitToCartDto: AddFruitToCartDto,
  ): Promise<ICarts> {
    const cart: any = await this.cartsModel.findById(cartId);
    const { fruitId, quantity } = addFruitToCartDto;

    if (!cart) {
      throw new ForbiddenException('Error: CS001 Contact admin');
    }

    /**
     * Get item index if exist on current cart
     */
    const itemIndex = cart.items.findIndex(
      (item: any) => item.fruitId == fruitId,
    );

    const item: any = cart.items[itemIndex];

    // Get fruit info
    const getFruitInfo: any = await this.fruitsService.findOne(fruitId);

    /**
     * If item found in current cart add quantity
     * and compute subtotal then run recalculateCart
     * else push item details and subtotal to cart
     * then run recalculateCart
     */
    if (itemIndex > -1) {
      item.quantity = item.quantity + quantity;
      item.subtotal = getFruitInfo.price * item.quantity;

      cart.items[itemIndex] = item;
      this.recalculateCart(cart, getFruitInfo.price);

      return cart.save();
    } else {
      const subtotal = quantity * getFruitInfo.price;

      cart.items.push({ ...addFruitToCartDto, subtotal });

      this.recalculateCart(cart, getFruitInfo.price);

      return cart.save();
    }
  }

  /**
   * Calculate cart total and quantity
   * @param cart current data
   * @param itemPrice price of the item from fruits service
   */
  recalculateCart(cart: ICarts, itemPrice: number) {
    cart.total = 0;
    cart.quantity = 0;

    cart.items.forEach((item: any) => {
      cart.total += item.quantity * itemPrice;
      cart.quantity += item.quantity;
    });
  }
}
