import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class OAuth2Dto {
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}
