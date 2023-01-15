import {
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
  createUser(
    @Res() response,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    const user = this.usersService.create(createUserDto);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Registered successfully',
      data: user,
    });
  }
}
