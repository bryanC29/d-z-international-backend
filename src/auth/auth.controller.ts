/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/common/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Get('logout')
  logout() {
    return 'logout';
  }

  @Get('forgot-password')
  forgotPassword() {
    return 'forgot-password';
  }

  @Post('reset-password')
  resetPassword() {
    return 'reset-password';
  }
}
