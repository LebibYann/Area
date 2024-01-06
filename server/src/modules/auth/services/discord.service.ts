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

  async refreshToken (refreshToken: string): Promise<TokenResponse> {
    return await super.refreshToken(
      discordConfig.TOKEN_ENDPOINT,
      refreshToken,
      discordConfig.CLIENT_ID,
      this.clientSecret ?? ''
    )
  }

  async getUserInfo (accessToken: string): Promise<DiscordUserInfo> {
    return await super.getUserInfo(
      accessToken,
      discordConfig.USER_INFO_ENDPOINT
    )
  }
}
