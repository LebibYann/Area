import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { type User } from 'src/modules/users/users.entity'


/**
 * LocalStrategy
 * Strategy for authenticating users using local username and password.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  private readonly logger = new Logger(LocalStrategy.name)

  /**
   * Validate user credentials.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns User object if credentials are valid.
   */
  async validate (email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password)
    if (user == null) {
      throw new UnauthorizedException('Email or password is incorrect.')
    }
    return user
  }
}
