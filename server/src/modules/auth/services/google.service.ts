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
export class GoogleOAuth2Service extends OAuth2Service {
  constructor(
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    private configService: ConfigService,
  ) {
    super(httpService, userService, credentialService);
  }

  private readonly googleTokenEndpoint = 'https://oauth2.googleapis.com/token';
  private readonly googleUserInfoEndpoint = 'https://openidconnect.googleapis.com/v1/userinfo';

  async exchangeCodeForToken(
    code: string,
    redirectUri: string
  ): Promise<AccessTokenResponse> {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');

    return super.exchangeCodeForToken(
      'google',
      this.googleTokenEndpoint,
      code,
      clientId,
      clientSecret,
      redirectUri
    );
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const clientId = 'your-google-client-id';
    const clientSecret = 'your-google-client-secret';

    return super.refreshToken(
      this.googleTokenEndpoint,
      refreshToken,
      clientId,
      clientSecret
    );
  }

  async getUserInfo(id_token: string): Promise<IDTokenInfo> {
    const parts = id_token.split('.');
    const idPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));

    return idPayload;
  }
}
