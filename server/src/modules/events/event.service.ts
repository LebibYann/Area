import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Event } from "./event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AboutService } from "../about/about.service";
import { CredentialService } from "../auth/services/credential.service";
import { ServiceName } from "../about/about.const";
import { TimerService } from "../providers/services/timer.service";
import { SpotifyService } from "../providers/services/spotify.service";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    private readonly aboutService: AboutService,
    private readonly credentialService: CredentialService,
    private readonly spotifyService: SpotifyService,
    private readonly timerService: TimerService
  ) {}

  logger = new Logger('EventService');

  aboutJson = this.aboutService.getAboutJson();
  private readonly servicesNames = Object.keys(ServiceName);

  async create(
    userId: number,
    isAction: boolean,
    serviceId: number,
    eventId: number,
    parameters: any
  ): Promise<Event | null> {

    if (!this.aboutJson.server.services[serviceId]) {
      throw new BadRequestException('Invalid service id.');
    }

    this.logger.debug(`Creating event for user ${userId} on service \"${this.servicesNames[serviceId]}\"`);

    if (isAction && !this.aboutJson.server.services[serviceId].reactions[eventId]) {
      throw new BadRequestException('Invalid action (reaction) id.')
    }
    if (!isAction && !this.aboutJson.server.services[serviceId].actions[eventId]) {
      throw new BadRequestException('Invalid trigger (action) id.')
    }

    // if (serviceId != 8 && serviceId != 7) {
    //   // Check if the user has credentials for this service
    //   const credentials = await this.credentialService.findOneByUserAndService(
    //     userId,
    //     ServiceName[this.servicesNames[serviceId]]
    //   );
    //   if (!credentials) {
    //     this.logger.debug(`User ${userId} has no credentials for service \"${this.servicesNames[serviceId]}\"`);
    //     throw new BadRequestException('No credentials for this service.');
    //   }
    //   this.logger.debug(`User ${userId} has credentials for service \"${this.servicesNames[serviceId]}\"`);
    // }

    // Check if the parameters are valid
    if (serviceId == 8) {
      if (!parameters.param1) {
        throw new BadRequestException('Invalid parameters.');
      }
      await this.timerService.getCurrentTime().then((time) => {
        this.logger.debug(`Parameters before : ${JSON.stringify(parameters)}`);
        parameters.param1 = time + parameters.param1;
        this.logger.debug(`Parameters after: ${JSON.stringify(parameters)}`);
      })
    }

    if (ServiceName[this.servicesNames[serviceId]] == ServiceName.SPOTIFY) {
      if (eventId == 2 && !parameters.param1) {
        throw new BadRequestException('Invalid parameters.');
      }
      const credentials = await this.credentialService.findOneByUserAndService(
        userId,
        ServiceName[this.servicesNames[serviceId]]
      );
      if (!credentials) {
        this.logger.debug(`User ${userId} has no credentials for service \"${this.servicesNames[serviceId]}\"`);
        throw new BadRequestException('No credentials for this service.');
      }
      const nbFollowers = await this.spotifyService.getNbFollowers(credentials.accessToken);
      this.logger.debug(`User ${userId} has ${nbFollowers} followers on Spotify`);
      let params = {
        param1: 0
      }
      if ( eventId == 2 && parameters.param1 ) {
        params = {
          param1: parameters.param1
        }
      } else if (eventId == 0) {
        params = {
          param1: nbFollowers
        }
      }
      parameters = params;
    }

    this.logger.debug(`Creating event for user ${userId} on service \"${this.servicesNames[serviceId]}\" with event .. and parameters ${JSON.stringify(parameters)}`);
    return await this.eventRepository.save({
      userId,
      isAction,
      serviceId,
      eventId,
      parameters,
    });
  }

  async findById (id: number): Promise<Event | null> {
    return await this.eventRepository.findOneBy({ id });
  }

  async findByUser(userId: number): Promise<Event[]> {
    return await this.eventRepository.findBy({ userId });
  }

  async update(id: number, actionData: Partial<Event>): Promise<void> {
    // TODO: Check if the parameters are valid

    await this.eventRepository.update(id, actionData);
  }

  async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
