import { Injectable } from "@nestjs/common";
import { Event } from "./event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {}

  async create(
    userId: number,
    isAction: boolean,
    serviceId: number,
    actionId: number,
    parameters: any
  ): Promise<Event | null> {
    return await this.eventRepository.save({
      userId,
      isAction,
      serviceId,
      actionId,
      parameters,
    });
  }

  async findByUser(userId: number): Promise<Event[]> {
    return await this.eventRepository.findBy({ userId });
  }

  async update(id: number, actionData: Partial<Event>): Promise<void> {
    await this.eventRepository.update(id, actionData);
  }

  async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
