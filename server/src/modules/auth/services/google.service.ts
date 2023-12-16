import { Injectable } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { Token } from '../entities/token.entity';
import { TokenResponse } from '../interfaces/token.interface';
import { UserInfoResponse } from '../interfaces/userInfo.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOAuth2Service extends OAuth2Service {
    private readonly googleTokenEndpoint = 'https://oauth2.googleapis.com/token';
    private readonly googleUserInfoEndpoint = 'https://openidconnect.googleapis.com/v1/userinfo';
    private configService: ConfigService;

    async exchangeCodeForToken(code: string): Promise<Token> {
        const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
        const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');

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

    async getUserInfo(accessToken: string): Promise<UserInfoResponse> {
        return super.getUserInfo(accessToken, this.googleUserInfoEndpoint);
    }
}
