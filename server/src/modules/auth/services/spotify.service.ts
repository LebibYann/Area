import { Injectable, NotImplementedException } from '@nestjs/common'
import { OAuth2Service } from './oauth2.service'
import { HttpService } from '@nestjs/axios'
import { UsersService } from 'src/modules/users/users.service'
import { CredentialService } from './credential.service'
import { ConfigService } from '@nestjs/config'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { type SpotifyUserInfo } from '../interfaces/userInfo.interface'
import { spotifyConfig } from 'config'

/**
 * SpotifyService
 * Service responsible for handling Spotify.
 */
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

  /**
   * Exchange an authorization code for an access token with Spotify.
   * @param code - The authorization code.
   * @param redirectUri - The redirect URI.
   * @returns The access token response.
   */
  async exchangeCodeForToken (
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    return await super.exchangeCodeForToken(
      'spotify',
      spotifyConfig.SPOTIFY_TOKEN_ENDPOINT,
      code,
      spotifyConfig.SPOTIFY_CLIENT_ID,
      this.spotifyClientSecret,
      redirectUri
    )
  }

  /**
   * Refresh an access token using a refresh token (Not Implemented for Spotify).
   * @param refreshToken - The refresh token.
   * @returns The access token response.
   */
  async refreshToken (refreshToken: string): Promise<AccessTokenResponse> {
    throw new NotImplementedException(
      'Spotify refresh token not implemented yet'
    )
  }

  /**
   * Get user information from Spotify using an access token.
   * @param accessToken - The access token.
   * @returns User information from Spotify.
   */
  async getUserInfo (accessToken: string): Promise<SpotifyUserInfo> {
    return await super.getUserInfo(accessToken, spotifyConfig.SPOTIFY_USER_INFO_ENDPOINT)
  }
}
