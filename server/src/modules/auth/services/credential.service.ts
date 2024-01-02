import { Injectable } from '@nestjs/common'
import { Credential } from '../entities/credential.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { type User } from '../../users/users.entity'

@Injectable()
export class CredentialService {
  constructor (
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>
  ) { }

  async findOneByUserAndService (
    user: User,
    service: string
  ): Promise<Credential | null> {
    return await this.credentialRepository.findOneBy({ userId: user.id, service })
  }

  async create (
    userId: number,
    service: string,
    password?: string,
    accessToken?: string,
    refreshToken?: string,
    idToken?: string,
    expiresAt?: Date
  ): Promise<Credential | null> {
    const hashedPassword = password != null
      ? await Credential.hashPassword(password)
      : undefined
    return await this.credentialRepository.save({
      userId,
      service,
      password: hashedPassword,
      accessToken,
      refreshToken,
      idToken,
      expiresAt
    })
  }

  async update (id: number, credentialData: Partial<Credential>): Promise<void> {
    await this.credentialRepository.update(id, credentialData)
  }

  async delete (id: number): Promise<void> {
    await this.credentialRepository.delete(id)
  }
}
