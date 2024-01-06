import { Injectable } from '@nestjs/common'
import { OAuth2Service } from './oauth2.service'
import { type TokenResponse } from '../interfaces/token.interface'
import { type IDTokenInfo } from '../interfaces/userInfo.interface'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { UsersService } from '../../users/users.service'
import { CredentialService } from './credential.service'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { googleConfig } from 'config'

@Injectable()
export class GoogleOAuth2Service extends OAuth2Service {
  constructor (
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    private readonly configService: ConfigService
  ) {
    super(httpService, userService, credentialService)
  }

  private readonly clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET')

  async exchangeCodeForToken (
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    return await super.exchangeCodeForToken(
      'google',
      googleConfig.TOKEN_ENDPOINT,
      code,
      googleConfig.CLIENT_ID,
      this.clientSecret ?? '',
      redirectUri
    )
  }

  async refreshToken (refreshToken: string): Promise<TokenResponse> {
    return await super.refreshToken(
      googleConfig.TOKEN_ENDPOINT,
      refreshToken,
      googleConfig.CLIENT_ID,
      this.clientSecret ?? ''
    )
  }

  async getUserInfo (idToken: string): Promise<IDTokenInfo> {
    const parts = idToken.split('.')
    const idPayload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf8')
    )

    return idPayload
  }
}
