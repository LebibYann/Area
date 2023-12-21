import { ApiProperty } from "@nestjs/swagger";

export class LocalTokenDto {
    @ApiProperty({ example: 'access_token', description: 'The access token' })
    access_token: string;
}
