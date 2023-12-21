import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    service: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({ nullable: true, type: 'text' })
    idToken: string;

    @Column({ nullable: true })
    expiresAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
