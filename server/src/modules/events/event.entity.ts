import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

/**
 * Event
 * Entity representing an action or a reaction of a service.
 */
@Entity()
export class Event {

  /**
   * The unique identifier of the event.
   */
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the event",
  })
  id: number;

  /**
   * Is the event a trigger (Action) or an action (Reaction)
   */
  @Column()
  @ApiProperty({
    example: true,
    description: "Is the event a trigger (Action) or an action (Reaction)",
  })
  isAction: boolean;

  /**
   * The unique identifier of the User who created the event.
   */
  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the User",
  })
  userId: number;

  /**
   * The unique identifier of the service associated with the event.
   */
  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the service",
  })
  serviceId: number;

  /**
   * The unique identifier of the action or reaction associated with the event.
   */
  @Column()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the event",
  })
  eventId: number;

  /**
   * The parameters of the event.
   */
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
