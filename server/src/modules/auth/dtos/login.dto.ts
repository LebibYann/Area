import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the User' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', description: 'The password of the User' })
  readonly password: string;
}
