import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { Request } from 'express';
import { JwtGuard } from './auth/jwt.guard';
import { UpdateUserDto } from './dto/update.dto';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordUserDto } from './dto/update.password.dto';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ type: User })
  async getMe(@Req() req: Request): Promise<User> {
    return this.userService.getMe(req.user?.['_id']);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ type: User })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Put('udpate')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ type: User })
  async update(@Body() dto: UpdateUserDto, @Req() req: Request): Promise<User> {
    return this.userService.update(req.user?.['_id'], dto);
  }

  @Put('change-password')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ type: User })
  async updatePassword(
    @Body() dto: UpdatePasswordUserDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.userService.changePassword(req.user?.['_id'], dto);
  }
}
