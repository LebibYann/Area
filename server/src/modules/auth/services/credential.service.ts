import { Injectable } from '@nestjs/common';
import { Credential } from '../entities/credential.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/users.entity';

@Injectable()
export class CredentialService {
    constructor(
        @InjectRepository(Credential)
        private credentialRepository: Repository<Credential>,
    ) {}

    async findOneByUserId(userId: number): Promise<Credential> {
        return this.credentialRepository.findOneBy({ userId })
    }

    async create(userId: number, password?: string, google: boolean = false): Promise<Credential> {
        return this.credentialRepository.save({ userId, password, google });
    }

    async update(id: number, credentialData: Partial<Credential>): Promise<void> {
        await this.credentialRepository.update(id, credentialData);
    }

    async delete(id: number): Promise<void> {
        await this.credentialRepository.delete(id);
    }
}
