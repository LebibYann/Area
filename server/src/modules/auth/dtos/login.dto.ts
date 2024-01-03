import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

/**
 * LoginDto
 */
export class LoginDto {
  /**
   * The email of the User.
   * @example
   * user@example.com
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the User' })
  readonly email: string

  /**
   * The password of the User.
   * @example
   * password
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', description: 'The password of the User' })
  readonly password: string
}
