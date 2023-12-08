import {
    Controller,
    Post,
    Get,
    Body,
    HttpCode,
    HttpStatus,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './users.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<void> {
        return this.usersService.update(id, updateUserDto);
    }
}
