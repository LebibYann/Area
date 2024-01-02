import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { type UpdateUserDto } from './dtos/updateUser.dto'
import { CredentialService } from '../auth/services/credential.service'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly credentialService: CredentialService
  ) {}

  async create (email: string): Promise<User> {
    const newUser = this.usersRepository.create({ email })
    return await this.usersRepository.save(newUser)
  }

  async findAll (): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOne (id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id })
  }

  async findOneByEmail (email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email })
  }

  async update (id: number, userData: UpdateUserDto): Promise<User | null> {
    await this.usersRepository.update(id, userData)
    return await this.usersRepository.findOneBy({ id })
  }

  async remove (id: number): Promise<void> {
    await this.usersRepository.delete(id)
    await this.credentialService.delete(id)
  }
}
