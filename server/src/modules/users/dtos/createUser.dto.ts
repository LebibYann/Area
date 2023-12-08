import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
