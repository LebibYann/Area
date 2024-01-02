import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { type User } from 'src/modules/users/users.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  private readonly logger = new Logger(LocalStrategy.name)

  async validate (email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password)
    if (user == null) {
      throw new UnauthorizedException('Email or password is incorrect.')
    }
    return user
  }
}
