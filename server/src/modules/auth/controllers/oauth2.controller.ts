import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { OAuth2Dto } from "../dtos/oauth2.dto";
import { GoogleOAuth2Service } from '../services/google.service';
import { UsersService } from 'src/modules/users/users.service';
import { CredentialService } from '../services/credential.service';
import { TokenService } from '../services/token.service';
import { User } from '../../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.interface';
import { log } from 'console';


@ApiTags('oauth2')
@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly goolgleService: GoogleOAuth2Service,
    private readonly userService: UsersService,
    private readonly credentialService: CredentialService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('google')
  @ApiOperation({ summary: 'Google OAuth2' })
  @ApiOkResponse({
    description: 'Login successful.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async google(@Body() oauth2Dto: OAuth2Dto): Promise<{ access_token: string }> {
    const token = await this.goolgleService.exchangeCodeForToken(oauth2Dto.code);
    //const userInfo = await this.goolgleService.getUserInfo(token.access_token);

    // Decode the ID token
    const parts = token.id_token.split('.');
    const idPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
    console.log(idPayload);

    // Check if user exists in database
    let user = await this.userService.findOneByEmail(idPayload.email);
    if (!user) {
      console.log('User not found');
      // Create new user if not exists
      user = await this.userService.create(idPayload.email);
      // Create new credential
      const newCred = await this.credentialService.create(user.id, null, true);

      console.log(newCred);

      // Create new token
      const tokenEntity = await this.tokenService.create({
        authenticationId: newCred.id,
        service: 'google',
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      });

      console.log(tokenEntity);

      // Sign the user in
      const payload: JwtPayload = {
        email: user.email,
        sub: tokenEntity.id.toString(),
        token_type: 'oauth2',
      };

      console.log(payload);

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    console.log('User found');

    // Check if user has credential
    const credential = await this.credentialService.findOneByUserId(user.id);

    if (!credential) {

      console.log('Credential not found');
      // Create new credential
      const newCred = await this.credentialService.create(user.id, null, true);

      // Create new token
      const tokenEntity = await this.tokenService.create({
        authenticationId: newCred.id,
        service: 'google',
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      });

      // Sign the user in
      const payload: JwtPayload = {
        email: user.email,
        sub: tokenEntity.id.toString(),
        token_type: 'oauth2',
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    console.log('Credential found');

    // Check if user has token
    const tokenEntity = await this.tokenService.findOneByCredentialsId(credential.id);

    if (!tokenEntity) {
      console.log('Token not found');

      // Create new token
      const newToken = await this.tokenService.create({
        authenticationId: credential.id,
        service: 'google',
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      });

      // Sign the user in
      const payload: JwtPayload = {
        email: user.email,
        sub: newToken.id.toString(),
        token_type: 'oauth2',
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    console.log('Token found');

    // Update token
    await this.tokenService.update(tokenEntity.id, {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    });

    // Sign the user in
    const payload: JwtPayload = {
      email: user.email,
      sub: tokenEntity.id.toString(),
      token_type: 'oauth2',
    };
  }

  @Post('discord')
  @ApiOperation({ summary: 'Discord OAuth2' })
  @ApiOkResponse({
    description: 'Login successful.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async discord(@Body() oauth2Dto: OAuth2Dto): Promise<{ access_token: string }> {
    const token = await this.goolgleService.exchangeCodeForToken(oauth2Dto.code);
    const userInfo = await this.goolgleService.getUserInfo(token.access_token);

    // Check if user exists in database
    let user = await this.userService.findOneByEmail(userInfo.email);
    if (!user) {
      // Create new user if not exists
      user = await this.userService.create(userInfo.email);
      // Create new credential
      await this.credentialService.create(user.id, null, true);

      // Create new token
      const tokenEntity = await this.tokenService.create({
        service: 'discord',
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      });

      // Sign the user in
      const payload: JwtPayload = {
        email: user.email,
        sub: tokenEntity.id.toString(),
        token_type: 'oauth2',
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
