import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Girish Daloso' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  @Matches(/^(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/, {
    message:
      'Username must contain alphanumeric and [._-] special character only.',
  })
  @ApiProperty({ example: 'gdaloso' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwer123' })
  password: string;
}
