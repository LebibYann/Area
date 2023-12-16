import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the User'
  })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the User'
  })
  email: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'The date of creation of the User'
  })
  created: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'The date of the last update of the User'
  })
  updated: Date;
}
