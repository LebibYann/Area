import { IsPositive } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAreaDto {
  @IsPositive()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the trigger",
  })
  readonly triggerId: number;

  @IsPositive()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the action",
  })
  readonly actionId: number;
}
