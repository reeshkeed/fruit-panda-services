import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
