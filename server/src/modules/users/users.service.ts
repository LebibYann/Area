import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Check, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { CredentialService } from '../auth/services/credential.service';
import { TokenService } from '../auth/services/token.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private credentialService: CredentialService,
        private tokenService: TokenService,
    ) {}

    async create(email: string): Promise<User> {
        const newUser = this.usersRepository.create({ email });
        return this.usersRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id: id });
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({ email: email });
    }

    async update(id: number, userData: UpdateUserDto): Promise<User> {
        await this.usersRepository.update(id, userData);
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
        await this.credentialService.delete(id);
        await this.tokenService.delete(id);
    }
}
