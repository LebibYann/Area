// strategies/jwt.strategy.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Logger
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '../../users/users.service'
import { ConfigService } from '@nestjs/config'
import { type User } from 'src/modules/users/users.entity'
import { type JwtPayload } from '../interfaces/jwt.interface'
import { CredentialService } from '../services/credential.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly usersService: UsersService,
    private readonly credentialService: CredentialService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    })
  }

  private readonly logger = new Logger(JwtStrategy.name)

  async validate (payload: JwtPayload): Promise<User> {
    if (payload.token_type === 'local') {
      const user = await this.usersService.findOneByEmail(payload.email)
      if (user == null) {
        this.logger.warn('Cannot find user associated with this token.', payload)
        throw new UnauthorizedException('Invalid token.')
      }
      const credential = await this.credentialService.findOneByUserAndService(
        user.id,
        'local'
      )
      if (credential == null) {
        this.logger.warn('Cannot find credential associated with this token.', payload)
        throw new UnauthorizedException('Invalid token.')
      }
      if (!await credential.validatePassword(payload.sub)) {
        this.logger.warn('Invalid password.', payload)
        throw new UnauthorizedException('Invalid token.')
      }
      return user
    } else if (payload.token_type === 'oauth2') {
      const user = await this.usersService.findOneByEmail(payload.email)
      if (user == null) {
        this.logger.warn('Cannot find user associated with this token.', payload)
        throw new UnauthorizedException('Invalid token.')
      }
      if (payload.sub !== user.id.toString()) {
        this.logger.warn('Invalid user ID.', payload)
        throw new UnauthorizedException('Invalid token.')
      }
      return user
    }
    throw new BadRequestException('Invalid token type. The token type must be either "local" or "oauth2": ' + payload.token_type)
  }
}
