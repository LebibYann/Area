import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { type UpdateUserDto } from './dtos/updateUser.dto'
import { CredentialService } from '../auth/services/credential.service'

/**
 * UsersService
 * Service responsible for user-related operations.
 */
@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly credentialService: CredentialService
  ) {}

  /**
   * Create a new user with the provided email.
   * @param email - The email of the user to be created.
   * @returns A Promise resolving to the created User.
   */
  async create (email: string): Promise<User> {
    const newUser = this.usersRepository.create({ email })
    return await this.usersRepository.save(newUser)
  }

  /**
   * Retrieve all users.
   * @returns A Promise resolving to an array of User entities.
   */
  async findAll (): Promise<User[]> {
    return await this.usersRepository.find()
  }

  /**
   * Retrieve a user by their unique identifier.
   * @param id - The unique identifier of the user.
   * @returns A Promise resolving to the found User or null if not found.
   */
  async findOne (id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id })
  }

  /**
   * Retrieve a user by their email address.
   * @param email - The email address of the user.
   * @returns A Promise resolving to the found User or null if not found.
   */
  async findOneByEmail (email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email })
  }

  /**
   * Update a user with the provided data.
   * @param id - The unique identifier of the user to be updated.
   * @param userData - The data to update the user with.
   * @returns A Promise resolving to the updated User or null if not found.
   */
  async update (id: number, userData: UpdateUserDto): Promise<User | null> {
    await this.usersRepository.update(id, userData)
    return await this.usersRepository.findOneBy({ id })
  }

  /**
   * Remove a user by their unique identifier.
   * @param id - The unique identifier of the user to be removed.
   * @returns A Promise resolving to void.
   */
  async remove (id: number): Promise<void> {
    await this.usersRepository.delete(id)
    await this.credentialService.delete(id)
  }
}
