import { ApiProperty } from '@nestjs/swagger'

/**
 * LocalTokenDto
 */
export class LocalTokenDto {
  /**
   * The access token.
   * @example
   * access_token
   */
  @ApiProperty({ example: 'access_token', description: 'The access token' })
    access_token: string
}
