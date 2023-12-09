// dto/register.dto.t
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the User' })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password', description: 'The password of the User' })
  readonly password: string;
}
