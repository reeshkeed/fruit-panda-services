import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Create user controller
   * @param createUserDto user payload
   * @returns user data
   */
  @Post()
  async createCart(
    @Res() response,
    @Body(new ValidationPipe()) createCartDto: CreateCartDto,
  ) {
    /**
     * Check if userId has existing cart
     * if getCart returns true throw an error
     */
    const hasCart = await this.cartsService.getCart(createCartDto.userId);

    if (hasCart.length) {
      throw new ConflictException('User already have an active cart');
    }

    const cart = await this.cartsService.create(createCartDto);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Registered successfully',
      data: { cart },
    });
  }

  /**
   * Get user active cart
   * @param response data
   * @param userId user ObjectId
   * @returns user cart
   */
  @Get(':id')
  async getCart(@Res() response, @Param('id') userId: string) {
    const cart = await this.cartsService.getCart(userId);

    if (!cart.length) {
      throw new NotFoundException('Error: CC001 Contact admin');
    }

    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Successfully retrieved',
      data: { cart },
    });
  }
}
