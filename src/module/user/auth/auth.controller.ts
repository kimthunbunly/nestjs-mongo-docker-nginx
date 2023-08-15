import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../schema/user.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReigsterDto } from './dto/register.dto';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ type: User })
  async registerUser(
    @Req() req: Request,
    @Body() dto: ReigsterDto,
  ): Promise<User> {
    return this.authService.registerUser(req.user?.['_id'], dto);
  }

  @Post('login')
  @ApiResponse({ type: String })
  async loginUser(@Body() dto: LoginDto): Promise<string> {
    return this.authService.loginUser(dto);
  }
}
