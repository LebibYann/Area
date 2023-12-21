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
import { LocalTokenDto } from '../dtos/localTokenResponse';
import { DiscordOAuth2Service } from '../services/discord.service';
import { SpotifyOAuth2Service } from '../services/spotify.service';

@ApiTags('oauth2')
@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly goolgleService: GoogleOAuth2Service,
    private readonly discordService: DiscordOAuth2Service,
    private readonly spotifyService: SpotifyOAuth2Service,
    private readonly userService: UsersService,
    private readonly credentialService: CredentialService,
    private readonly identificationService: IdentificationService,
    private readonly jwtService: JwtService,
  ) { }

  logger = new Logger(OAuth2Controller.name);

  @Post('google')
  @ApiOperation({ summary: 'Google OAuth2' })
  @ApiOkResponse({description: 'Login successful.', type: LocalTokenDto})
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async google(@Body() oauth2Dto: OAuth2Dto): Promise<LocalTokenDto> {
    this.logger.debug("Google OAuth2 Triggered");

    const token = await this.goolgleService.exchangeCodeForToken(
      oauth2Dto.code,
      oauth2Dto.redirectUri
    );
    const userInfo = await this.goolgleService.getUserInfo(token.id_token);

    this.logger.debug("Fetched User Info");

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

    this.logger.debug("Login Successful. Local JWT Generated");

    return response;
  }

  @Post('discord')
  @ApiOperation({ summary: 'Discord OAuth2' })
  @ApiOkResponse({description: 'Login successful.', type: LocalTokenDto})
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async discord(@Body() oauth2Dto: OAuth2Dto): Promise<LocalTokenDto> {
    const token = await this.discordService.exchangeCodeForToken(
      oauth2Dto.code,
      oauth2Dto.redirectUri
    );

    this.logger.debug("Fetched Discord Token", token);

    const userInfo = await this.discordService.getUserInfo(token.access_token);

    this.logger.debug("Fetched Discord User Info", userInfo);

    const user = await this.identificationService.identifyUser(
      userInfo.user.username,
      'discord',
      token
    );

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id.toString(),
      token_type: 'oauth2',
    };

    this.logger.debug("Login Successful. Local JWT Generated");

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @Post('spotify')
  @ApiOperation({ summary: 'Spotify OAuth2' })
  @ApiOkResponse({description: 'Login successful.', type: LocalTokenDto})
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async spotify(@Body() oauth2Dto: OAuth2Dto): Promise<LocalTokenDto> {
    const token = await this.spotifyService.exchangeCodeForToken(
      oauth2Dto.code,
      oauth2Dto.redirectUri
    );

    this.logger.debug("Fetched Spotify Token", token);

    const userInfo = await this.spotifyService.getUserInfo(token.access_token);

    this.logger.debug("Fetched Spotify User Info", userInfo);

    const user = await this.identificationService.identifyUser(
      userInfo.email,
      'spotify',
      token
    );

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id.toString(),
      token_type: 'oauth2',
    };

    this.logger.debug("Login Successful. Local JWT Generated");

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
