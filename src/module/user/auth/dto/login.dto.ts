import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'mx-user' })
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty({ example: '@mx-user12345' })
  @IsNotEmpty()
  password: string;
}
