import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guards';

@Controller()
export class AuthenticationController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
