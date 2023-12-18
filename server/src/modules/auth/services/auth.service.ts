import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/users.entity';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { CredentialService } from './credential.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private credentialService: CredentialService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const credential = await this.credentialService.findOneByUserId(user.id);
      if (!credential) {
        this.logger.warn('Cannot find credential associated with this user.', { email });
        return null;
      }
      if (!await credential.validatePassword(password)) {
        this.logger.warn('Password is incorrect.', { email });
        return null;
      }
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise< { access_token: string } > {
    const payload = { email: loginDto.email, sub: loginDto.password, token_type: 'local' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.usersService.create(registerDto.email);
    await this.credentialService.create(user.id, registerDto.password);
    return user;
  }
}
