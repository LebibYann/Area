import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Event } from "./event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AboutService } from "../about/about.service";
import { CredentialService } from "../auth/services/credential.service";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    private readonly aboutService: AboutService,
    private readonly credentialService: CredentialService
  ) {}

  logger = new Logger('EventService');

  aboutJson = this.aboutService.getAboutJson();
  servicesNames = this.aboutService.getServicesNames();

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

    // Check if the user has credentials for this service
    const credentials = await this.credentialService.findOneByUserAndService(
      userId,
      this.servicesNames[serviceId]
    );
    if (!credentials) {
      throw new BadRequestException('No credentials for this service.');
    }
    this.logger.debug(`User ${userId} has credentials for service \"${this.servicesNames[serviceId]}\"`);

    // TODO: Check if the parameters are valid

    this.logger.debug(`Creating event for user ${userId} on service \"${this.servicesNames[serviceId]}\" with event \"${this.aboutJson.server.services[serviceId].actions[eventId].name}\" and parameters ${JSON.stringify(parameters)}`);
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
