import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate user data if username exist
   * and compare hashed password else
   * @param username string
   * @param password hash string
   * @returns user data
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      _id: user._id,
      name: user.name,
      username: user.username,
    };

    return {
      status: HttpStatus.OK,
      message: 'Login success',
      data: {
        token: this.jwtService.sign(payload),
      },
    };
  }
}
