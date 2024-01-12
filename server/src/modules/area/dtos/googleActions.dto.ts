import { ApiProperty } from "@nestjs/swagger";

export class GoogleSendMailDto {
  @ApiProperty({
    example: "gtgbhfijbsdiuvoriubivbfd",
    description: "The acces token of google",
  })
  token: string;

  @ApiProperty({
    example: "lol@gmail.com",
    description: "The mail used to send email",
  })
  from: string;

  @ApiProperty({
    example: "Test@gmail.com",
    description: "The mail to send the mail",
  })
  to: string;

  @ApiProperty({
    example: "AREA",
    description: "The title of the mail",
  })
  header: string;

  @ApiProperty({
    example: "I want to finish this week and validate AREA with grade C and 4 credits",
    description: "The body of the mail",
  })
  body: string;
}