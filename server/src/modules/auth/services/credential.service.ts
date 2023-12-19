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
	) { }

	async findOneByUserAndService(user: User, service: string): Promise<Credential> {
		return this.credentialRepository.findOneBy({ userId: user.id, service });
	}

	async create(
		userId: number,
		service: string,
		password?: string,
		access_token?: string,
		refresh_token?: string,
		id_token?: string,
		expires_at?: Date,
	): Promise<Credential> {
		const hashedPassword = password ?
			await Credential.hashPassword(password) : undefined;
		return this.credentialRepository.save({
			userId,
			service,
			password: hashedPassword,
			accessToken: access_token,
			refreshToken: refresh_token,
			idToken: id_token,
			expiresAt: expires_at,
		});
	}

	async update(id: number, credentialData: Partial<Credential>): Promise<void> {
		await this.credentialRepository.update(id, credentialData);
	}

	async delete(id: number): Promise<void> {
		await this.credentialRepository.delete(id);
	}
}
