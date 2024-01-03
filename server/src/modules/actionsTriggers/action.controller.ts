import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {
  RequestWithUser
} from "src/common/interfaces/requestwithUser.interface";
import { ActionTriggerService } from "./actionTrigger.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("actions")
@Controller(["actions", "triggers"])
export class ActionController {
  constructor (private readonly actionTriggerService: ActionTriggerService) {}

  @Post(':service/:event')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create an action' })
  @ApiOkResponse({ description: 'The action has been created' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBadRequestResponse({ description: 'Invalid service, action or parameters' })
  async create(
    @Param('service') service: number,
    @Param('event') event: number,
    @Body() parameters: any,
    @Request() req: RequestWithUser
  )
  : Promise<any> {
    if (req.user == null) {
      throw new InternalServerErrorException('Error with JWT strategy.')
    }
    return await this.actionTriggerService.create(
      req.user.id,
      req.url.includes('actions'),
      service,
      event,
      parameters
    );
  }

  @Patch(':service/:event/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an event' })
  @ApiOkResponse({ description: 'The event has been updated' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBadRequestResponse({ description: 'Invalid service, event or parameters' })
  async update(
    @Param('service') service: number,
    @Param('event') event: number,
    @Param('id') id: number,
    @Body() parameters: any,
    @Request() req: RequestWithUser
  )
  : Promise<any> {
    if (req.user == null) {
      throw new InternalServerErrorException('Error with JWT strategy.')
    }

    const events = await this.actionTriggerService.findByUser(req.user.id);
    if (!events || events.filter(e => e.id === id).length === 0) {
      throw new BadRequestException('Invalid event id.');
    }

    return await this.actionTriggerService.update(
      id,
      {
        userId: req.user.id,
        isAction: req.url.includes('actions'),
        serviceId: service,
        actionId: event,
        parameters
      }
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiOkResponse({ description: 'The event has been deleted' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBadRequestResponse({ description: 'Invalid service, event or parameters' })
  async delete(
    @Param('id') id: number,
    @Request() req: RequestWithUser
  ) : Promise<any> {
    if (req.user == null) {
      throw new InternalServerErrorException('Error with JWT strategy.')
    }

    const events = await this.actionTriggerService.findByUser(req.user.id);
    if (!events || events.filter(e => e.id === id).length === 0) {
      throw new BadRequestException('Invalid event id.');
    }

    return await this.actionTriggerService.delete(id);
  }
}