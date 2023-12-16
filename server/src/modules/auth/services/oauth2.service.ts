import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CredentialService } from './credential.service';
import { TokenService } from './token.service';
import { Token } from '../entities/token.entity';
import { TokenResponse } from '../interfaces/token.interface';
import { UserInfoResponse } from '../interfaces/userInfo.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class OAuth2Service {
  constructor(
    private httpService: HttpService,
    private userService: UsersService,
    private credentialService: CredentialService,
    private tokenService: TokenService,
  ) { }

  async exchangeCodeForToken(
    service: string,
    tokenEndpoint: string,
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): Promise<Token> {
    try {
      const response = await firstValueFrom(this.httpService.post(tokenEndpoint, {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }));

      const token = await this.tokenService.create({
        service,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });

      return token;
    } catch (error) {
      throw new HttpException(
        'Failed to exchange code for token',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async refreshToken(
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
        grant_type: 'refresh_token',
      }));

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserInfo(
    accessToken: string,
    userInfoEndpoint: string
  ): Promise<UserInfoResponse> {
    try {
      const response = await firstValueFrom(this.httpService.get(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }));

      return { id: response.data.sub, email: response.data.email }
    } catch (error) {
      throw new HttpException(
        'Failed to validate user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateUser(email: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    return !!user;
  }

  
}