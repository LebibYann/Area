import { ApiProperty } from "@nestjs/swagger";

export class TwitterSendTweetDto {
  @ApiProperty({
    example: "gtgbhfijbsdiuvoriubivbfd",
    description: "The acces token of github",
  })
  token: string;
  
  @ApiProperty({
    example: "Hello World!",
    description: "The message to send through a tweet",
  })
  content: string;
}