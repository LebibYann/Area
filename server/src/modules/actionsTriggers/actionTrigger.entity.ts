import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class ActionTrigger {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the Action/Trigger",
  })
  id: number;

  @Column()
  @ApiProperty({
    example: "true",
    description: "Action or Trigger",
  })
  isAction: boolean;

  @Column()
  @ApiProperty({
    example: "1",
    description: "The unique identifier of the User",
  })
  userId: number;

  @Column()
  @ApiProperty({
    example: "1",
    description: "The unique identifier of the service",
  })
  serviceId: number;

  @Column()
  @ApiProperty({
    example: "1",
    description: "The unique identifier of the action/trigger",
  })
  actionId: number;

  @Column({ type: "json", nullable: true })
  @ApiProperty({
    example: "{ \"key\": \"value\" }",
    description: "The parameters of the action/trigger",
  })
  parameters: any;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;
}
