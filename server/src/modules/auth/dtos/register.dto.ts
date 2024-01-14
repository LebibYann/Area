// dto/register.dto.t
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

/**
 * RegisterDto
 */
export class RegisterDto {
  /**
   * The email of the User.
   * @example
   * user@example.com
   */
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the User' })
  readonly email: string

  /**
   * The password of the User.
   * @example
   * password
   */
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password', description: 'The password of the User' })
  readonly password: string
}
