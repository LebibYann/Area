import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OAuth2Dto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'code', description: 'The code from Google OAuth2' })
    readonly code: string;
}
