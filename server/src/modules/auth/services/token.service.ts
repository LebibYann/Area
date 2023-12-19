import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>,
    ) {}

    async create(token: Partial<Token>): Promise<Token> {
        return this.tokenRepository.save(token);
    }

    async findOneByCredentialsId(authenticationId: number): Promise<Token> {
        return this.tokenRepository.findOneBy({ authenticationId });
    }

    async update(id: number, tokenData: Partial<Token>): Promise<void> {
        await this.tokenRepository.update(id, tokenData);
    }

    async delete(id: number): Promise<void> {
        await this.tokenRepository.delete(id);
    }
    // Other methods...
}