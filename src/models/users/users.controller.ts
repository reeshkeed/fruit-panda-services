import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Res() response,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    /**
     * First verify username if already exist
     * if findUsername service return true
     * throw ConflictException
     */
    const isUsernameTaken = await this.usersService.findUsername(
      createUserDto.username,
    );

    if (isUsernameTaken) {
      throw new BadRequestException('Username is already taken');
    }

    const user = await this.usersService.create(createUserDto);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Registered successfully',
      data: user,
    });
  }
}
