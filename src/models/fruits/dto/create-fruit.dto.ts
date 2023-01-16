import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateFruitDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/, {
    message: 'Name must contain alphanumeric and [._-] special character only.',
  })
  @ApiProperty({ example: 'Mango' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @Matches(/^(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/, {
    message:
      'Description must contain alphanumeric and [._-] special character only.',
  })
  @ApiProperty({
    example: 'Lorem Ipsum dolor sit amet',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 200 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 50 })
  stock: number;
}
