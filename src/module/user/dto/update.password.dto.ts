import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordUserDto {
  @ApiProperty({ example: '@mx-user12345' })
  @IsNotEmpty()
  @IsString()
  new_password: string;

  @ApiProperty({ example: '@mx-user12345' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
