import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {
  RequestWithUser
} from "src/common/interfaces/requestwithUser.interface";
import { EventService } from "./event.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("events")
@Controller(["actions", "triggers"])
export class EventController {
  constructor (private readonly eventService: EventService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all events' })
  @ApiOkResponse({ description: 'The events have been fetched' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  async findAll(@Request() req: RequestWithUser): Promise<any> {
    if (req.user == null) {
      throw new InternalServerErrorException('Error with JWT strategy.')
    }
    const isAction = req.url.includes('actions');
    return (await this.eventService.findByUser(req.user.id)).filter(e => e.isAction === isAction);
  }

  @Post(':service/:event')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: Object })
  @ApiOperation({ summary: 'Create an event' })
  @ApiOkResponse({ description: 'The event has been created', type: Event })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBadRequestResponse({ description: 'Invalid service, event or parameters' })
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

    const newEvent = await this.eventService.create(
      req.user.id,
      req.url.includes('actions'),
      service,
      event,
      parameters
    );

    if (!newEvent) {
      throw new BadRequestException('Invalid service, event or parameters.');
    }
    return newEvent;
  }

  @Patch(':service/:event/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: Object })
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
  ) : Promise<any> {
    if (req.user == null) {
      throw new InternalServerErrorException('Error with JWT strategy.')
    }

    const events = await this.eventService.findByUser(req.user.id);
    if (!events || events.filter(e => e.id === id).length === 0) {
      throw new BadRequestException('Invalid event id.');
    }

    return await this.eventService.update(
      id,
      {
        userId: req.user.id,
        isAction: req.url.includes('actions'),
        serviceId: service,
        eventId: event,
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

    const events = await this.eventService.findByUser(req.user.id);
    if (!events || events.filter(e => e.id === id).length === 0) {
      throw new BadRequestException('Invalid event id.');
    }

    return await this.eventService.delete(id);
  }
}