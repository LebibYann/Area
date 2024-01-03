import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../../users/users.service'
import { type User } from '../../users/users.entity'
import { type RegisterDto } from '../dtos/register.dto'
import { type LoginDto } from '../dtos/login.dto'
import { CredentialService } from './credential.service'

/**
 * AuthService
 * Service responsible for authentication-related functionalities.
 */
@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly credentialService: CredentialService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  /**
   * Validate user credentials.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns User object if credentials are valid, otherwise null.
   */
  async validateUser (email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email)
    if (user != null) {
      const credential = await this.credentialService.findOneByUserAndService(user, 'local')
      if (credential == null) {
        this.logger.warn('Cannot find credential associated with this user.', { email })
        return null
      }
      if (!await credential.validatePassword(password)) {
        this.logger.warn('Password is incorrect.', { email })
        return null
      }
      return user
    }
    return null
  }

  /**
   * Login a user and generate an access token.
   * @param loginDto - The login information.
   * @returns Object containing the access token.
   */
  async login (loginDto: LoginDto): Promise< { access_token: string } > {
    const payload = { email: loginDto.email, sub: loginDto.password, token_type: 'local' }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  /**
   * Register a new user.
   * @param registerDto - The registration information.
   * @returns The newly created user.
   */
  async register (registerDto: RegisterDto): Promise<User> {
    const user = await this.usersService.create(registerDto.email)
    await this.credentialService.create(user.id, 'local', registerDto.password)
    return user
  }
}
