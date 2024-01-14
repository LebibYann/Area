import { Injectable } from '@nestjs/common'
import { Credential } from '../entities/credential.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { type User } from '../../users/users.entity'

/**
 * CredentialService
 * Service responsible for handling user credentials.
 */
@Injectable()
export class CredentialService {
  constructor (
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>
  ) { }

  /**
   * Find a credential by user and service.
   * @param user - The user associated with the credential.
   * @param service - The service for which the credential is associated.
   * @returns Credential object if found, otherwise null.
   */
  async findOneByUserAndService (
    userId: number,
    service: string
  ): Promise<Credential | null> {
    return await this.credentialRepository.findOneBy({ userId, service })
  }

  async findAllByUserId (userId: number): Promise<Credential[]> {
    return await this.credentialRepository.findBy({ userId })
  }

  /**
   * Create a new credential.
   * @param userId - The user ID associated with the credential.
   * @param service - The service for which the credential is associated.
   * @param password - The hashed password (if applicable).
   * @param accessToken - The access token (if applicable).
   * @param refreshToken - The refresh token (if applicable).
   * @param idToken - The ID token (if applicable).
   * @param expiresAt - The expiration date of the credential (if applicable).
   * @returns The created credential object.
   */
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

  /**
   * Update a credential.
   * @param id - The ID of the credential to update.
   * @param credentialData - Partial data to update in the credential.
   */
  async update (id: number, credentialData: Partial<Credential>): Promise<void> {
    await this.credentialRepository.update(id, credentialData)
  }

  /**
   * Delete a credential.
   * @param id - The ID of the credential to delete.
   */
  async delete (id: number): Promise<void> {
    await this.credentialRepository.delete(id)
  }
}
