import { ApiProperty } from "@nestjs/swagger";

export class WeatherDto {
  @ApiProperty({
    example: "Paris",
    description: "The location for the api call",
  })
  location: string;
}
