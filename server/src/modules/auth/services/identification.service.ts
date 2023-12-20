import { Injectable, Logger } from "@nestjs/common";
import { AccessTokenResponse } from "../interfaces/accessTokenRes.interface";
import { CredentialService } from "./credential.service";
import { Credential } from "../entities/credential.entity";
import { User } from "src/modules/users/users.entity";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class IdentificationService {
  constructor(
    private readonly credentialService: CredentialService,
    private readonly userService: UsersService,
  ) { }

  logger = new Logger(IdentificationService.name);

  async identifyCredentials(
    service: string,
    token: AccessTokenResponse,
    user: User,
  ): Promise<Credential> {
    this.logger.debug("Identify Credentials", { service, token, user });
    const credential = await this.credentialService.findOneByUserAndService(user, service);
    if (credential) {
      this.logger.debug("Credentials found");
      await this.credentialService.update(credential.id, {
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        idToken: token.id_token ? token.id_token : null,
        expiresAt: new Date(Date.now() + token.expires_in * 1000),
      });
    } else {
      this.logger.debug("Credentials not found. Creating...")
      await this.credentialService.create(
        user.id,
        service,
        undefined,
        token.access_token,
        token.refresh_token,
        token.id_token,
        new Date(Date.now() + token.expires_in * 1000),
      );
    }
    return credential;
  }

  async identifyUser(
    email: string,
    service?: string,
    token?: AccessTokenResponse
  ): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return await this.userService.create(email);
    }

    if (service && token) {
      await this.identifyCredentials(service, token, user);
    }

    return user;
  }
}
