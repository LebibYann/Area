import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ActionTrigger } from "../actionsTriggers/actionTrigger.entity";
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

  @ManyToOne(() => ActionTrigger)
  @JoinColumn({ name: "actionId" })
  action: ActionTrigger;

  @ManyToOne(() => ActionTrigger)
  @JoinColumn({ name: "triggerId" })
  trigger: ActionTrigger;
}
