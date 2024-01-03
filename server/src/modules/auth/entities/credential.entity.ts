import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { User } from '../../users/users.entity'
import * as bcrypt from 'bcrypt'

/**
 * Entity representing user credentials stored in the database.
 */
@Entity()
export class Credential {
  /**
   * Unique identifier for the credential.
   */
  @PrimaryGeneratedColumn()
    id: number

  /**
   * ID of the user associated with this credential.
   */
  @Column()
    userId: number

  /**
   * Service associated with this credential.
   */
  @Column()
    service: string

  /**
   * Hashed password associated with this credential.
   */
  @Column({ nullable: true })
    password: string

  /**
   * Access token associated with this credential.
   */
  @Column({ nullable: true })
    accessToken: string

  /**
   * Refresh token associated with this credential.
   */
  @Column({ nullable: true })
    refreshToken: string

  /**
   * ID token associated with this credential.
   */
  @Column({ nullable: true, type: 'text' })
    idToken: string

  /**
   * Expiry date and time of the credential.
   */
  @Column({ nullable: true })
    expiresAt: Date

  /**
   * Relationship with the User entity.
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
    user: User

  /**
   * Hashes the provided password using bcrypt.
   * @param password - The plain-text password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  static async hashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  /**
   * Validates the provided password against the stored hashed password.
   * @param password - The plain-text password to be validated.
   * @returns A promise that resolves to a boolean indicating whether the password is valid.
   */
  async validatePassword (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}
