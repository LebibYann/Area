// strategies/jwt.strategy.ts
import { BadRequestException, Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/users.entity';
import { JwtPayload } from '../interfaces/jwt.interface';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  private readonly logger = new Logger(JwtStrategy.name);

  async validate(payload: JwtPayload): Promise<User> {
    if (payload.token_type === 'local') {
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        this.logger.warn('Cannot find user associated with this token.', payload);
        throw new UnauthorizedException('Invalid token.');
      }
      return user;
    } else if (payload.token_type === 'oauth2') {
      // TODO: Implement OAuth2 validation
      throw new NotImplementedException('OAuth2 validation is not implemented yet.');
    }
    throw new BadRequestException('Invalid token type. The token type must be either "local" or "oauth2".');
  }
}
