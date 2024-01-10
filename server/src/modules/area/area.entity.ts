import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../events/event.entity";
import { User } from "../users/users.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the area",
  })
  id: number;

  @Column()
  @ApiProperty({
    example: "My Area",
    description: "The name of the area",
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the User",
  })
  userId: number;

  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the action",
  })
  actionId: number;

  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the trigger",
  })
  triggerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Event)
  @JoinColumn({ name: "actionId" })
  action: Event;

  @ManyToOne(() => Event)
  @JoinColumn({ name: "triggerId" })
  trigger: Event;
}
