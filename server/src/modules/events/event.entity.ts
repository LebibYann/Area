import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the event",
  })
  id: number;

  @Column()
  @ApiProperty({
    example: true,
    description: "Is the event a trigger (Action) or an action (Reaction)",
  })
  isAction: boolean;

  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the User",
  })
  userId: number;

  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the service",
  })
  serviceId: number;

  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the event",
  })
  eventId: number;

  @Column({ type: "json", nullable: true })
  @ApiProperty({
    example: "{ \"key\": \"value\" }",
    description: "The parameters of the event",
  })
  parameters: any;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;
}
