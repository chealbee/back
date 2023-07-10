import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: CreateUserDto) {
    return this.authService.login(body);
  }

  @Post('registration')
  async registration(@Body() body: CreateUserDto) {
    return this.authService.registration(body);
  }
}
