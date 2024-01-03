import { IsEmail, IsString, MinLength } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * CreateUserDto
 * Data transfer object for creating a new user.
 */
export class CreateUserDto {
  /**
   * The email of the user.
   * @example
   * user@example.com
   */
  @IsEmail()
  @ApiProperty({ example: 'user@exemple.com', description: 'The email of the User' })
    email: string

  /**
   * The password of the user.
   * @example
   * password
   */
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password', description: 'The password of the User' })
    password: string
}
