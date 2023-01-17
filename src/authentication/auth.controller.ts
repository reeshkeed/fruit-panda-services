import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guards';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { Public } from 'src/common/guards/public.guards';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { UsersService } from 'src/models/users/users.service';

@Controller()
export class AuthenticationController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * Register user controller
   * @param createUserDto user payload
   * @returns user data
   */
  @Public()
  @Post('register')
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
   * Public login controller
   * @Public public route guard to user access publicly
   * @param req request payload (credentials)
   * @returns user token
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * @UseGuards jwtAuthGuard bearer token required
   * @param req request payload
   * @returns user data
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
