import { Injectable } from '@nestjs/common'
import { OAuth2Service } from './oauth2.service'
import { type TokenResponse } from '../interfaces/token.interface'
import { type DiscordUserInfo } from '../interfaces/userInfo.interface'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { UsersService } from '../../users/users.service'
import { CredentialService } from './credential.service'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { discordConfig } from 'config'

/**
 * DiscordService
 * Service responsible for handling Discord.
 */
@Injectable()
export class DiscordOAuth2Service extends OAuth2Service {
  constructor (
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    private readonly configService: ConfigService
  ) {
    super(httpService, userService, credentialService)
  }

  private readonly clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET')

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
      'discord',
      discordConfig.TOKEN_ENDPOINT,
      code,
      discordConfig.CLIENT_ID,
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
      discordConfig.TOKEN_ENDPOINT,
      refreshToken,
      discordConfig.CLIENT_ID,
      this.clientSecret ?? ''
    )
  }

  /**
   * Retrieve user information using the access token.
   * @param accessToken - The valid access token obtained after authentication.
   * @returns Discord user information.
   */
  async getUserInfo (accessToken: string): Promise<DiscordUserInfo> {
    return await super.getUserInfo(
      accessToken,
      discordConfig.USER_INFO_ENDPOINT
    )
  }
}
