import { ApiProperty } from "@nestjs/swagger";

export class DiscordSendMessagesDto {
  @ApiProperty({
    example: "Hello World!",
    description: "The message to send through Discord",
  })
  param1: string;
}
