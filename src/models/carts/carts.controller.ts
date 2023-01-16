import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly usersService: UsersService,
  ) {}

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
     * First verify user if exist
     * if isUserExist is empty
     * throw BadRequestException
     */
    const isUserExist = await this.usersService.findOne(createCartDto.userId);

    if (!isUserExist) {
      throw new BadRequestException('User does not exist');
    }

    const cart = await this.cartsService.create(createCartDto);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Registered successfully',
      data: { cart },
    });
  }
}
