import {
  BadRequestException,
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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create user controller
   * @param createUserDto user payload
   * @returns user data
   */
  @Post()
  async createUser(
    @Res() response,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    /**
     * First verify username if already exist
     * if findUsername service return null
     * throw BadRequestException
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
      data: { user },
    });
  }

  /**
   * Find user controller
   * @param id user ObjectId
   * @returns user data
   */
  @Get(':id')
  async findUser(@Res() response, @Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User does not exist`);
    }

    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Successfully retrieved',
      data: { user },
    });
  }

  /**
   * Find by id & update user data controller
   * @param response data
   * @param id user ObjectId
   * @param updateUserDto data payload
   * @returns updated user data
   */
  @Put(':id')
  async findUserAndUpdate(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    /**
     * First verify username if already exist
     * if findUsername service return null
     * throw BadRequestException
     */
    const isUsernameTaken = await this.usersService.findUsername(
      updateUserDto.username,
    );

    if (isUsernameTaken) {
      throw new BadRequestException('Username is already taken');
    }

    const user = await this.usersService.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Successfully updated',
      data: { user },
    });
  }
}
