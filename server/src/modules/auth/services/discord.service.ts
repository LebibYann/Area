import { Injectable } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { TokenResponse } from '../interfaces/token.interface';
import { DiscordUserInfo, IDTokenInfo } from '../interfaces/userInfo.interface';
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
  private readonly discordUserInfoEndpoint = 'https://discord.com/api/oauth2/@me';

  private readonly discordClientId = this.configService.get<string>('DISCORD_CLIENT_ID');
  private readonly discordClientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');

  async exchangeCodeForToken(
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    return super.exchangeCodeForToken(
      'discord',
      this.discordTokenEndpoint,
      code,
      this.discordClientId,
      this.discordClientSecret,
      redirectUri
    );
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    return super.refreshToken(
      this.discordTokenEndpoint,
      refreshToken,
      this.discordClientId,
      this.discordClientSecret
    );
  }

  async getUserInfo(accessToken: string): Promise<DiscordUserInfo> {
    return super.getUserInfo(accessToken, this.discordUserInfoEndpoint);
  }
}