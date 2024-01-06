import { Injectable } from '@nestjs/common'
import { OAuth2Service } from './oauth2.service'
import { type TokenResponse } from '../interfaces/token.interface'
import { type IDTokenInfo } from '../interfaces/userInfo.interface'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { UsersService } from '../../users/users.service'
import { CredentialService } from './credential.service'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { twitterConfig } from 'config'

/**
 * TwitterService
 * Service responsible for handling Twitter.
 */
@Injectable()
export class TwitterOAuth2Service extends OAuth2Service {
  constructor (
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    private readonly configService: ConfigService
  ) {
    super(httpService, userService, credentialService)
  }

  private readonly clientSecret = this.configService.get<string>('TWITTER_CLIENT_SECRET')

  /**
   * Exchange the authorization code for an access token.
   * @param code - The authorization code received from the OAuth2 authorization endpoint.
   * @param redirectUri - The redirect URI used in the authorization request.
   * @returns Access token response.
   */
  async exchangeCodeForToken (
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    return await super.exchangeCodeForToken(
      'twitter',
      twitterConfig.TWITTER_TOKEN_ENDPOINT,
      code,
      twitterConfig.TWITTER_CLIENT_ID,
      this.clientSecret ?? '',
      redirectUri
    )
  }

  /**
   * Refresh the access token using the refresh token.
   * @param refreshToken - The refresh token obtained during the initial authorization.
   * @returns Token response containing a new access token.
   */
  async refreshToken (refreshToken: string): Promise<TokenResponse> {
    return await super.refreshToken(
      twitterConfig.TWITTER_TOKEN_ENDPOINT,
      refreshToken,
      twitterConfig.TWITTER_CLIENT_ID,
      this.clientSecret ?? ''
    )
  }

  /**
   * Get user information from the ID token.
   * @param idToken - The ID token obtained during authentication.
   * @returns Information extracted from the ID token.
   */
  async getUserInfo (idToken: string): Promise<IDTokenInfo> {
    const parts = idToken.split('.')
    const idPayload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf8')
    )

    return idPayload
  }
}
