import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ICartsItem } from '../schema/cart-item.schema';

export class CreateCartDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @ApiProperty({ example: 200 })
  total: number;

  @IsNumber()
  @ApiProperty({ example: 2 })
  quantity: number;

  @IsArray()
  @ApiProperty({ example: [] })
  items: ICartsItem[];
}
