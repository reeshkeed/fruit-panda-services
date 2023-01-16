import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';

@Controller()
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  /**
   * Create fruit controller
   * @param createFruitDto payload
   * @returns fruit data
   */
  @Post()
  async createFruit(
    @Res() response,
    @Body(new ValidationPipe()) createFruitDto: CreateFruitDto,
  ) {
    const fruit = await this.fruitsService.create(createFruitDto);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Fruit created successfully',
      data: { fruit },
    });
  }
}
