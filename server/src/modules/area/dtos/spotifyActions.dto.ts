import { ApiProperty } from "@nestjs/swagger";

export class SpotifyDto {
  @ApiProperty({
    example: "gtgbhfijbsdiuvoriubivbfd",
    description: "The acces token of spotify",
  })
  token: string;
}