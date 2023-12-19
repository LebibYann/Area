import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { OAuth2Dto } from "../dtos/oauth2.dto";
import { GoogleOAuth2Service } from '../services/google.service';
import { UsersService } from 'src/modules/users/users.service';
import { CredentialService } from '../services/credential.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.interface';
import { IdentificationService } from '../services/identification.service';
import { Logger } from '@nestjs/common';

@ApiTags('oauth2')
@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly goolgleService: GoogleOAuth2Service,
    private readonly userService: UsersService,
    private readonly credentialService: CredentialService,
    private readonly identificationService: IdentificationService,
    private readonly jwtService: JwtService,
  ) { }

  logger = new Logger(OAuth2Controller.name);

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
    this.logger.debug("Google OAuth2", { code: oauth2Dto.code });
    const token = await this.goolgleService.exchangeCodeForToken(oauth2Dto.code);
    const userInfo = await this.goolgleService.getUserInfo(token.id_token);

    this.logger.debug("User Info", userInfo);

    const user = await this.identificationService.identifyUser(
      userInfo.email,
      'google',
      token
    );

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id.toString(),
      token_type: 'oauth2',
    };

    const response = {
      access_token: this.jwtService.sign(payload),
    };

    this.logger.debug("Access Token (local)", response);

    return response;
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
      await this.credentialService.create(
        user.id,
        'discord',
        null,
        token.access_token,
        token.refresh_token,
        token.id_token ? token.id_token : null,
        new Date(),
      );

      // Sign the user in
      const payload: JwtPayload = {
        email: user.email,
        sub: user.id.toString(),
        token_type: 'oauth2',
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
