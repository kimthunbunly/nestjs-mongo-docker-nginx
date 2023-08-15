import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ example: 'mx user' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'male' })
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty({ example: 'your-mail@marksix.com' })
  @IsOptional()
  email: string;
}
