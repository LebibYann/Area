import {
  Controller,
  Get,
  Body,
  Delete,
  Patch,
  UseGuards,
  Request,
  InternalServerErrorException
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { type Request as ExpressRequest } from 'express'
import { UsersService } from './users.service'
import { User } from './users.entity'
import { UpdateUserDto } from './dtos/updateUser.dto'
import { AuthGuard } from '@nestjs/passport'

/**
 * UsersInterface
 * Interface for request with user
 */
interface RequestWithUser extends ExpressRequest {
  user: User
}

@ApiTags('users')
@Controller('users')
/**
 * UsersController
 * Controller responsible for handling user-related HTTP requests.
 */
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  /**
   * Get the authenticated user.
   * @param req - The HTTP request.
   * @returns A Promise resolving to the authenticated User.
   */
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the authenticated user' })
  @ApiOkResponse({ description: 'The user with the matching id', type: User })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getUser (@Request() req: RequestWithUser): Promise<User> {
    if (req.user == null) {
      throw new InternalServerErrorException('Error with JWT strategy.')
    }
    return req.user
  }

  /**
   * Delete the authenticated user.
   * @param req - The HTTP request.
   * @returns A Promise resolving to void.
   */
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete the authenticated user' })
  @ApiOkResponse({ description: 'The user with the matching id has been deleted' })
  @ApiNoContentResponse({ description: 'No user found with the matching id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async remove (@Request() req: RequestWithUser): Promise<void> {
    await this.usersService.remove(req.user.id)
  }

  /**
   * Update the authenticated user.
   * @param req - The HTTP request.
   * @param updateUserDto - The data to update the user with.
   * @returns A Promise resolving to the updated User or null if not found.
   */
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update the authenticated user' })
  @ApiOkResponse({ description: 'The user with the matching id has been updated' })
  @ApiNoContentResponse({ description: 'No user found with the matching id' })
  @ApiBadRequestResponse({ description: 'The email or password is invalid.' })
  @ApiConflictResponse({ description: 'The email is already taken.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update (
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    return await this.usersService.update(req.user.id, updateUserDto)
  }
}
