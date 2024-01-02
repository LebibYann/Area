import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { CredentialService } from './credential.service'
import { type TokenResponse } from '../interfaces/token.interface'
import { UsersService } from 'src/modules/users/users.service'
import { AxiosError } from 'axios'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'

@Injectable()
export class OAuth2Service {
  constructor (
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService
  ) { }

  private readonly logger = new Logger(OAuth2Service.name)

  async exchangeCodeForToken (
    service: string,
    tokenEndpoint: string,
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    try {
      const response = await firstValueFrom(this.httpService.post(
        tokenEndpoint,
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
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
