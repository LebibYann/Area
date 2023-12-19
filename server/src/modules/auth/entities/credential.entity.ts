import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userId: number;

    @Column({ nullable: true })
    password: string;

    @Column({ default: false })
    google: boolean;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
