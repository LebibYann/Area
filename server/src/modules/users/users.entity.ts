import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

/**
 * User
 * Entity representing a user in the application.
 */
@Entity()
export class User {
  /**
   * The unique identifier of the User.
   * @example
   * 1
   */
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the User'
  })
    id: number

  /**
   * The email of the user
   * @example
   * lol@gmail.com
   */
  @Column({ unique: true })
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the User'
  })
    email: string

  /**
   * The date of creation of the User.
   * @example
   * 2020-01-01T00:00:00.000Z
   */

  @CreateDateColumn()
  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'The date of creation of the User'
  })
    created: Date

  /**
   * The date of the last update of the User.
   * @example
   * 2020-01-01T00:00:00.000Z
   */
  @UpdateDateColumn()
  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'The date of the last update of the User'
  })
    updated: Date
}
