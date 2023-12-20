import { Injectable } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { TokenResponse } from '../interfaces/token.interface';
import { IDTokenInfo } from '../interfaces/userInfo.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../../users/users.service';
import { CredentialService } from './credential.service';
import { AccessTokenResponse } from '../interfaces/accessTokenRes.interface';

@Injectable()
export class DiscordOAuth2Service extends OAuth2Service {
  constructor(
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    private configService: ConfigService,
  ) {
    super(httpService, userService, credentialService);
  }

  private readonly discordTokenEndpoint = 'https://discord.com/api/oauth2/token';
  private readonly discordUserInfoEndpoint = 'https://openidconnect.googleapis.com/v1/userinfo';

  async exchangeCodeForToken(
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');

    console.log(code);

    return super.exchangeCodeForToken(
      'discord',
      this.discordTokenEndpoint,
      code,
      clientId,
      clientSecret,
      redirectUri
    );
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const clientId = 'TODO';
    const clientSecret = 'TODO';

    return super.refreshToken(
      this.discordTokenEndpoint,
      refreshToken,
      clientId,
      clientSecret
    );
  }

  async getUserInfo(accessToken: string): Promise<IDTokenInfo> {
    return super.getUserInfo(accessToken, this.discordUserInfoEndpoint);
  }
}