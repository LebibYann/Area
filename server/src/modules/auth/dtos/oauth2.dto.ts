import { IsNotEmpty, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * OAuth2Dto
 */
export class OAuth2Dto {
  /**
   * The code from Google OAuth2.
   * @example
   * code
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'code', description: 'The code from Google OAuth2' })
  readonly code: string

  /**
   * The redirect URI.
   * @example
   * http://localhost:3000/auth/google
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'http://localhost:3000/auth/google', description: 'The redirect URI' })
  readonly redirectUri: string
}
