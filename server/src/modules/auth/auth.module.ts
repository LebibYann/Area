import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { CredentialService } from './services/credential.service';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './entities/credential.entity';
import { Token } from './entities/token.entity';
import { OAuth2Controller } from './controllers/oauth2.controller';
import { OAuth2Service } from './services/oauth2.service';
import { GoogleOAuth2Service } from './services/google.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Credential, Token]),
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, OAuth2Controller],
  providers: [
    AuthService,
    CredentialService,
    TokenService,
    OAuth2Service,
    GoogleOAuth2Service,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, CredentialService, TokenService],
})
export class AuthModule { }
