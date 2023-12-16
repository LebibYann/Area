import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Credential } from './credential.entity';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authenticationId: number;

    @Column()
    service: string;

    @Column()
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;

    @ManyToOne(() => Credential)
    @JoinColumn({ name: 'authenticationId' })
    authentication: Credential;
}