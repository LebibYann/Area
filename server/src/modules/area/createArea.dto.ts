import { IsPositive } from "@nestjs/class-validator";

export class CreateAreaDto {
  @IsPositive()
  readonly triggerId: number;

  @IsPositive()
  readonly actionId: number;
}
