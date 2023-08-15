import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReigsterDto {
  @ApiProperty({ example: 'mx-user' })
  @IsNotEmpty()
  @IsString()
  user_name: string;

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

  @ApiProperty({ example: '@mx-user12345' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
