import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthService } from './services/auth.service'
import { UsersModule } from '../users/users.module'
import { AuthController } from './controllers/auth.controller'
import { CredentialService } from './services/credential.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Credential } from './entities/credential.entity'
import { OAuth2Controller } from './controllers/oauth2.controller'
import { OAuth2Service } from './services/oauth2.service'
import { GoogleOAuth2Service } from './services/google.service'
import { HttpModule } from '@nestjs/axios'
import { IdentificationService } from './services/identification.service'
import { DiscordOAuth2Service } from './services/discord.service'
import { SpotifyOAuth2Service } from './services/spotify.service'
import { TwitterOAuth2Service } from './services/twitter.service'

/**
 * AuthModule
 * Module responsible for handling authentication-related functionalities.
 */
@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Credential]),
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController, OAuth2Controller],
  providers: [
    AuthService,
    CredentialService,
    OAuth2Service,
    GoogleOAuth2Service,
    DiscordOAuth2Service,
    SpotifyOAuth2Service,
    TwitterOAuth2Service,
    LocalStrategy,
    JwtStrategy,
    IdentificationService
  ],
  exports: [AuthService, CredentialService]
})
export class AuthModule { }
