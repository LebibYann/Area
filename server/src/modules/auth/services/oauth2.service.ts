import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { CredentialService } from './credential.service'
import { type TokenResponse } from '../interfaces/token.interface'
import { UsersService } from 'src/modules/users/users.service'
import { AxiosError } from 'axios'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'

/**
 * OAuth2Service
 * Service responsible for Oauth2.
 */
@Injectable()
export class OAuth2Service {
  constructor (
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService
  ) { }

  private readonly logger = new Logger(OAuth2Service.name)

  /**
   * Exchange an authorization code for an access token.
   * @param service - The name of the service.
   * @param tokenEndpoint - The token endpoint URL.
   * @param code - The authorization code.
   * @param clientId - The client ID.
   * @param clientSecret - The client secret.
   * @param redirectUri - The redirect URI.
   * @returns The access token response.
   */
  async exchangeCodeForToken (
    service: string,
    tokenEndpoint: string,
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    code_verifier: string | undefined = undefined
  ): Promise<AccessTokenResponse> {
    try {
      const response = await firstValueFrom(this.httpService.post(
        tokenEndpoint,
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code_verifier
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
          }
        }
      ))

      this.logger.debug('Exchanged auth code for access token (' + service + ')')

      return response.data
    } catch (error) {
      const errorMessage = 'Failed to exchange code for token'
      if (error instanceof AxiosError) {
        this.logger.error(errorMessage, error.response?.data)
      } else {
        this.logger.error(errorMessage, error)
      }
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Refresh an access token using a refresh token.
   * @param tokenEndpoint - The token endpoint URL.
   * @param refreshToken - The refresh token.
   * @param clientId - The client ID.
   * @param clientSecret - The client secret.
   * @returns The token response with a new access token.
   */
  async refreshToken (
    tokenEndpoint: string,
    refreshToken: string,
    clientId: string,
    clientSecret: string
  ): Promise<TokenResponse> {
    try {
      const response = await firstValueFrom(this.httpService.post(tokenEndpoint, {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token'
      }))

      return response.data
    } catch (error) {
      const errorMessage = 'Failed to refresh token'
      if (error instanceof AxiosError) {
        this.logger.error(errorMessage, error.response?.data)
      } else {
        this.logger.error(errorMessage, error)
      }
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Get user information using an access token.
   * @param accessToken - The access token.
   * @param userInfoEndpoint - The user info endpoint URL.
   * @returns User information.
   */
  async getUserInfo (
    accessToken: string,
    userInfoEndpoint: string
  ): Promise<any> {
    try {
      // Request user info from service
      const response = await firstValueFrom(this.httpService.get(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }))

      return { ...response.data }
    } catch (error) {
      const errorMessage = 'Failed to get user info'
      if (error instanceof AxiosError) {
        this.logger.error(errorMessage, error.response?.data)
      } else {
        this.logger.error(error)
      }
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
