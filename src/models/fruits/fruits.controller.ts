import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
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

  /**
   * Find user controller
   * @param id user ObjectId
   * @returns user data
   */
  @Get(':id')
  async findFruit(@Res() response, @Param('id') id: string) {
    const fruit = await this.fruitsService.findOne(id);

    if (!fruit) {
      throw new NotFoundException(`Fruit does not exist`);
    }

    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Successfully retrieved',
      data: { fruit },
    });
  }
}
