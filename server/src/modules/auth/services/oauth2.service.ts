import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CredentialService } from './credential.service';
import { TokenService } from './token.service';
import { Token } from '../entities/token.entity';
import { TokenResponse } from '../interfaces/token.interface';
import { UserInfoResponse } from '../interfaces/userInfo.interface';
import { UsersService } from 'src/modules/users/users.service';
import { Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable()
export class OAuth2Service {
  constructor(
    protected httpService: HttpService,
    protected userService: UsersService,
    protected credentialService: CredentialService,
    protected tokenService: TokenService,
  ) { }

  private readonly logger = new Logger(OAuth2Service.name);

  async exchangeCodeForToken(
    service: string,
    tokenEndpoint: string,
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): Promise<Token> {
    try {
      // Request token from service
      const response = await firstValueFrom(this.httpService.post(
        tokenEndpoint,
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }
      ));

      // Create token entity
      const token = await this.tokenService.create({
        service,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });

      return token;

    } catch (error) {
      if ( error instanceof AxiosError )
        this.logger.error("Error exchanging code for token:", error.response.data);
      else
        this.logger.error("Error exchanging code for token:", error);
      throw new HttpException(
        'Failed to exchange code for token',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      // Refresh token from service
      const response = await firstValueFrom(this.httpService.post(tokenEndpoint, {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      }));

      return response.data;
    } catch (error) {
      if ( error instanceof AxiosError )
        this.logger.error("Error refreshing token:", error.response.data);
      else
        this.logger.error("Error refreshing token:", error);
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
      // Request user info from service
      const response = await firstValueFrom(this.httpService.get(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }));

      return { id: response.data.sub, email: response.data.email }
    } catch (error) {
      if ( error instanceof AxiosError ) {
        this.logger.error("Error validating user:", error.response.data);
      } else {
        this.logger.error(error);
      }
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