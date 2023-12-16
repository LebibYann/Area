import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { OAuth2Dto } from "../dtos/oauth2.dto";
import { GoogleOAuth2Service } from '../services/google.service';
import { UsersService } from 'src/modules/users/users.service';
import { CredentialService } from '../services/credential.service';
import { TokenService } from '../services/token.service';
import { User } from '../../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.interface';


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
  @ApiResponse({ status: HttpStatus.OK, description: 'Google OAuth2 successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({ type: OAuth2Dto })
  async google(@Body() oauth2Dto: OAuth2Dto): Promise<{ access_token: string }> {
    const token = await this.goolgleService.exchangeCodeForToken(oauth2Dto.code);
    const userInfo = await this.goolgleService.getUserInfo(token.accessToken);

    // Check if user exists in database
    let user = await this.userService.findOneByEmail(userInfo.email);
    if (!user) {
      // Create new user if not exists
      user = await this.userService.create(userInfo.email);
      // Create new credential
      await this.credentialService.create(user.id, null, true);

      // Create new token
      const tokenEntity = await this.tokenService.create({
        service: 'google',
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
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
