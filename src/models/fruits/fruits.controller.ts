import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { Public } from 'src/common/guards/public.guards';

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
   * Find fruit controller
   * @param id fruit ObjectId
   * @returns fruit data
   */
  @Public()
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

  /**
   * Find by id & update fruit data controller
   * @param response data
   * @param id fruit ObjectId
   * @param updateFruitDto data payload
   * @returns updated fruit data
   */
  @Put(':id')
  async findFruitAndUpdate(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateFruitDto: UpdateFruitDto,
  ) {
    const fruit = await this.fruitsService.update(id, updateFruitDto);

    if (!fruit) {
      throw new NotFoundException('Fruit does not exist');
    }

    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Successfully updated',
      data: { fruit },
    });
  }
}
