import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../events/event.entity";
import { User } from "../users/users.entity";

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column()
  actionId: number;

  @Column()
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
