import {
    Controller,
    Post,
    Get,
    Body,
    HttpStatus,
    Param,
    Delete,
    Patch,
    Res,
    UseGuards,
    Request,
    InternalServerErrorException
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './users.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends ExpressRequest {
    user: User;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get the authenticated user' })
    @ApiOkResponse({ description: 'The user with the matching id', type: User })
    @ApiUnauthorizedResponse({ description: 'Invalid access token' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    async getUser(@Request() req: RequestWithUser): Promise<User> {
        if (!req.user)
            throw new InternalServerErrorException('Error with JWT strategy.');
        return req.user;
    }

    @Delete('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete the authenticated user' })
    @ApiOkResponse({ description: 'The user with the matching id has been deleted' })
    @ApiNoContentResponse({ description: 'No user found with the matching id' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async remove(@Request() req: RequestWithUser): Promise<void> {
        return this.usersService.remove(req.user.id);
    }

    @Patch('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update the authenticated user' })
    @ApiOkResponse({ description: 'The user with the matching id has been updated' })
    @ApiNoContentResponse({ description: 'No user found with the matching id' })
    @ApiBadRequestResponse({ description: 'The email or password is invalid.'})
    @ApiConflictResponse({ description: 'The email is already taken.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async update(@Request() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(req.user.id, updateUserDto);
    }
}
