import { IsEmail, IsOptional, IsString, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsEmail()
    @ApiProperty({ example: 'user@exemple.com', description: 'The email of the User' })
    email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'password', description: 'The password of the User' })
    password: string;
}
