import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OAuth2Dto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'code', description: 'The code from Google OAuth2' })
    readonly code: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'http://localhost:3000/auth/google', description: 'The redirect URI' })
    readonly redirectUri: string;
}
