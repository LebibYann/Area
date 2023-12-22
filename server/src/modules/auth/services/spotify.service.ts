import { Injectable, NotImplementedException } from '@nestjs/common'
import { OAuth2Service } from './oauth2.service'
import { HttpService } from '@nestjs/axios'
import { UsersService } from 'src/modules/users/users.service'
import { CredentialService } from './credential.service'
import { ConfigService } from '@nestjs/config'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { type SpotifyUserInfo } from '../interfaces/userInfo.interface'

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

  private readonly spotifyTokenEndpoint = 'https://accounts.spotify.com/api/token'
  private readonly spotifyUserInfoEndpoint = 'https://api.spotify.com/v1/me'

  private readonly spotifyClientId = this.configService.get<string>(
    'SPOTIFY_CLIENT_ID') ?? ''

  private readonly spotifyClientSecret = this.configService.get<string>(
    'SPOTIFY_CLIENT_SECRET') ?? ''

  async exchangeCodeForToken (
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    return await super.exchangeCodeForToken(
      'spotify',
      this.spotifyTokenEndpoint,
      code,
      this.spotifyClientId,
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
    return await super.getUserInfo(accessToken, this.spotifyUserInfoEndpoint)
  }
}
