import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddFruitToCartDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  fruitId: ObjectId;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  quantity: number;
}
