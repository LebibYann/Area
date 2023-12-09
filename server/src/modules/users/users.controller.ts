import {
    Controller,
    Post,
    Get,
    Body,
    HttpStatus,
    Param,
    Delete,
    Patch,
    Res
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './users.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /* @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.'})
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'The email is already taken.'})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The email or password is invalid.'})
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<User> {
        const user = await this.usersService.findOneByEmail(createUserDto.email);
        if (user) {
            res.status(HttpStatus.CONFLICT).send('The email is already taken.');
        }
        const newUser = await this.usersService.create(createUserDto);
        res.status(HttpStatus.CREATED).send(newUser);
        return newUser;
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, description: 'All users' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No users found' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user with the matching id' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No user found with the matching id' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user with the matching id has been deleted' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No user found with the matching id' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user with the matching id has been updated' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No user found with the matching id' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The email or password is invalid.'})
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'The email is already taken.'})
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<void> {
        return this.usersService.update(id, updateUserDto);
    }
     */
}
