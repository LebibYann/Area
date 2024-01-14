import { ApiProperty } from "@nestjs/swagger";

export class GoogleSendMailDto {
  @ApiProperty({
    example: "lol@gmail.com",
    description: "The mail used to send email",
  })
  param1: string;

  @ApiProperty({
    example: "Test@gmail.com",
    description: "The mail to send the mail",
  })
  param2: string;

  @ApiProperty({
    example: "AREA",
    description: "The title of the mail",
  })
  param3: string;

  @ApiProperty({
    example: "I want to finish this week and validate AREA with grade C and 4 credits",
    description: "The body of the mail",
  })
  param4: string;
}