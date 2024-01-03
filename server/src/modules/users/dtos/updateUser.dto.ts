import { IsEmail, IsOptional, IsString, MinLength } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * UpdateUserDto
 * Data transfer object for updating user information.
 */
export class UpdateUserDto {
  /**
   * The email of the user.
   * @example
   * user@example.com
   */
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the User' })
    email?: string

  /**
   * The password of the user.
   * @example
   * password
   */
  @IsString()
  @MinLength(8)
  @IsOptional()
  @ApiProperty({ example: 'password', description: 'The password of the User' })
    password?: string
}
