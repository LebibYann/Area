import { IsEmail, IsOptional, IsString, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the User' })
  email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  @ApiProperty({ example: 'password', description: 'The password of the User' })
  password?: string;
}
