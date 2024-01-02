import { Injectable, Logger } from '@nestjs/common'
import { type AccessTokenResponse } from '../interfaces/accessTokenRes.interface'
import { CredentialService } from './credential.service'
import { type Credential } from '../entities/credential.entity'
import { type User } from 'src/modules/users/users.entity'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class IdentificationService {
  constructor (
    private readonly credentialService: CredentialService,
    private readonly userService: UsersService
  ) { }

  logger = new Logger(IdentificationService.name)

  async identifyCredentials (
    service: string,
    token: AccessTokenResponse,
    user: User
  ): Promise<Credential | null> {
    const credential = await this.credentialService.findOneByUserAndService(
      user,
      service
    )
    if (credential != null) {
      this.logger.debug('Credentials found')
      await this.credentialService.update(credential.id, {
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        idToken: token.id_token ?? undefined,
        expiresAt: new Date(Date.now() + token.expires_in * 1000)
      })
    } else {
      this.logger.debug('Credentials not found. Creating...')
      await this.credentialService.create(
        user.id,
        service,
        undefined,
        token.access_token,
        token.refresh_token,
        token.id_token,
        new Date(Date.now() + token.expires_in * 1000)
      )
    }
    return credential
  }

  async identifyUser (
    email: string,
    service?: string,
    token?: AccessTokenResponse
  ): Promise<User> {
    const user = await this.userService.findOneByEmail(email)

    if (user == null) {
      return await this.userService.create(email)
    }

    if (service != null && token != null) {
      await this.identifyCredentials(service, token, user)
    }

    return user
  }
}
