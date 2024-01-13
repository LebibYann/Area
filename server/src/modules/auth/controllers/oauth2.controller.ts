import { Controller, Post, Body, Logger, UseGuards, Request, InternalServerErrorException, Get } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { OAuth2Dto } from '../dtos/oauth2.dto'
import { GoogleOAuth2Service } from '../services/google.service'
import { JwtService } from '@nestjs/jwt'
import { type JwtPayload } from '../interfaces/jwt.interface'
import { IdentificationService } from '../services/identification.service'
import { LocalTokenDto } from '../dtos/localTokenResponse'
import { DiscordOAuth2Service } from '../services/discord.service'
import { SpotifyOAuth2Service } from '../services/spotify.service'
import { TwitterOAuth2Service } from '../services/twitter.service'
import { GithubOAuth2Service } from '../services/github.service'
import { AuthGuard } from '@nestjs/passport'
import { RequestWithUser } from 'src/common/interfaces/requestwithUser.interface'
import { CredentialService } from '../services/credential.service'

/**
 * Controller for OAuth2 authentication.
 */
@ApiTags('oauth2')
@Controller('oauth2')
export class OAuth2Controller {
  constructor (
    private readonly goolgleService: GoogleOAuth2Service,
    private readonly discordService: DiscordOAuth2Service,
    private readonly spotifyService: SpotifyOAuth2Service,
    private readonly twitterService: TwitterOAuth2Service,
    private readonly githubService: GithubOAuth2Service,
    private readonly identificationService: IdentificationService,
    private readonly jwtService: JwtService,
    private readonly credentialsService: CredentialService
  ) { }

  logger = new Logger(OAuth2Controller.name)

  /**
   * Login with Google OAuth2.
   * @returns {Promise<LocalTokenDto>} LocalTokenDto
   */
  @Post('google')
  @ApiOperation({ summary: 'Google OAuth2' })
  @ApiOkResponse({ description: 'Login successful.', type: LocalTokenDto })
  @ApiCreatedResponse({ description: 'User created. Login successful', type: LocalTokenDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async google (@Body() oauth2Dto: OAuth2Dto): Promise<LocalTokenDto> {
    this.logger.debug('Google OAuth2 Triggered')

    const token = await this.goolgleService.exchangeCodeForToken(
      oauth2Dto.code,
      oauth2Dto.redirectUri
    )
    const userInfo = await this.goolgleService.getUserInfo(token.id_token)

    this.logger.debug('Fetched User Info')

    const user = await this.identificationService.identifyUser(
      userInfo.email,
      'google',
      token
    )

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id.toString(),
      token_type: 'oauth2'
    }

    const response = {
      access_token: this.jwtService.sign(payload)
    }

    this.logger.debug('Login Successful. Local JWT Generated')

    return response
  }

  /**
   * Login with Discord OAuth2.
   * @returns {Promise<void>} void
   */
  @Post('discord')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Discord OAuth2' })
  @ApiOkResponse({ description: 'OAuth2 successful.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async discord (
    @Request() req: RequestWithUser,
    @Body() oauth2Dto: OAuth2Dto
  ) : Promise<void> {

    const token = await this.discordService.exchangeCodeForToken(
      oauth2Dto.code,
      oauth2Dto.redirectUri
    )

    this.logger.debug('Fetched Discord Token', token)

    const user = await this.identificationService.identifyUser(
      req.user.email,
      'discord',
      token
    )
  }

  /**
   * Login with Spotify OAuth2.
   * @returns {Promise<LocalTokenDto>} LocalTokenDto
   */
  @Post('spotify')
  @ApiOperation({ summary: 'Spotify OAuth2' })
  @ApiOkResponse({ description: 'Login successful.', type: LocalTokenDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: OAuth2Dto })
  async spotify (@Body() oauth2Dto: OAuth2Dto): Promise<LocalTokenDto> {
    const token = await this.spotifyService.exchangeCodeForToken(
      oauth2Dto.code,
      oauth2Dto.redirectUri
    )

    this.logger.debug('Fetched Spotify Token', token)

    const userInfo = await this.spotifyService.getUserInfo(token.access_token)

    this.logger.debug('Fetched Spotify User Info')

    const user = await this.identificationService.identifyUser(
      userInfo.email,
      'spotify',
      token
    )

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id.toString(),
      token_type: 'oauth2'
    }

    this.logger.debug('Login Successful. Local JWT Generated')

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  /**
   * Login with Twitter OAuth2.
   * @returns {Promise<void>} void
   */
   @Post('Twitter')
   @UseGuards(AuthGuard('jwt'))
   @ApiBearerAuth('access-token')
   @ApiOperation({ summary: 'Twitter OAuth2' })
   @ApiOkResponse({ description: 'OAuth2 successful.' })
   @ApiBadRequestResponse({ description: 'Bad request.' })
   @ApiUnauthorizedResponse({ description: 'Access token is invalid.' })
   @ApiBody({ type: OAuth2Dto })
   async twitter (
    @Request() req: RequestWithUser,
    @Body() oauth2Dto: OAuth2Dto
  ): Promise<void> {
     const token = await this.twitterService.exchangeCodeForToken(
       oauth2Dto.code,
       oauth2Dto.redirectUri
     )

     this.logger.debug('Fetched Twitter Token')

     const user = await this.identificationService.identifyUser(
       req.user.email,
       'twitter',
       token
     )
   }

   /**
   * Login with Github OAuth2.
   * @returns {Promise<void>} void
   */
    @Post('Github')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Github OAuth2' })
    @ApiOkResponse({ description: 'OAuth2 successful.' })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiUnauthorizedResponse({ description: 'Access token is invalid.' })
    @ApiBody({ type: OAuth2Dto })
    async github (
      @Request() req: RequestWithUser,
      @Body() oauth2Dto: OAuth2Dto
    ): Promise<void> {
      const token = await this.githubService.exchangeCodeForToken(
        oauth2Dto.code,
        oauth2Dto.redirectUri
      )

      this.logger.debug('Fetched Github Token', token)

      const user = await this.identificationService.identifyUser(
        req.user.email,
        'github',
        token
      )
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get the list of services the user is connected to.' })
    @ApiOkResponse({ description: 'The list of services the user is connected to.' })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiUnauthorizedResponse({ description: 'Access token is invalid.' })
    async getServices (
      @Request() req: RequestWithUser
    ): Promise<string[]> {
      if (req.user == null) {
        throw new InternalServerErrorException('Error with JWT strategy.')
      }

      const creds = await this.credentialsService.findAllByUserId(req.user.id)

      return creds.map(cred => cred.service)
    }
}
