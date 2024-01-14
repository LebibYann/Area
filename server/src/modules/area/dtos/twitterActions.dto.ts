import { ApiProperty } from "@nestjs/swagger";

export class TwitterSendTweetDto {
  @ApiProperty({
    example: "Hello World!",
    description: "The message to send through a tweet",
  })
  param1: string;
}

export class TwitterGetTrends {
  @ApiProperty({
    example: "gtgbhfijbsdiuvoriubivbfd",
    description: "The acces token of twitter",
  })
  token: string;

  @ApiProperty({
    example: "football",
    description: "The first word",
  })
  word1: string;

  @ApiProperty({
    example: "football",
    description: "The second word",
  })
  word2: string;

  @ApiProperty({
    example: "football",
    description: "The third word",
  })
  word3: string;

  @ApiProperty({
    example: "football",
    description: "The fourth word",
  })
  word4: string;
}