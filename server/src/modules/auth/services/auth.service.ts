import { Injectable } from '@nestjs/common';
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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const credential = await this.credentialService.findOneByUserId(user.id);
      if (credential && await credential.validatePassword(password)) {
        return user;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise< { access_token: string } > {
    const payload = { email: loginDto.email, sub: loginDto.password };
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
