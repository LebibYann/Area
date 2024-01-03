import { Injectable, NotImplementedException } from '@nestjs/common'
import { OAuth2Service } from './oauth2.service'
import { HttpService } from '@nestjs/axios'
import { UsersService } from 'src/modules/users/users.service'
import { CredentialService } from './credential.service'
import { ConfigService } from '@nestjs/config'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { type SpotifyUserInfo } from '../interfaces/userInfo.interface'
import { spotifyConfig } from 'config'
@Injectable()
export class SpotifyOAuth2Service extends OAuth2Service {
  constructor (
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    private readonly configService: ConfigService
  ) {
    super(httpService, userService, credentialService)
  }

  private readonly spotifyClientSecret = this.configService.get<string>(
    'SPOTIFY_CLIENT_SECRET') ?? ''

  async exchangeCodeForToken (
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    return await super.exchangeCodeForToken(
      'spotify',
      spotifyConfig.TOKEN_ENDPOINT,
      code,
      spotifyConfig.CLIENT_ID,
      this.spotifyClientSecret,
      redirectUri
    )
  }

  async refreshToken (refreshToken: string): Promise<AccessTokenResponse> {
    throw new NotImplementedException(
      'Spotify refresh token not implemented yet'
    )
  }

  async getUserInfo (accessToken: string): Promise<SpotifyUserInfo> {
    return await super.getUserInfo(accessToken, spotifyConfig.USER_INFO_ENDPOINT)
  }
}
