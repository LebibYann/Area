import { Injectable } from "@nestjs/common";
import { ActionTrigger } from "./actionTrigger.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ActionTriggerService {
  constructor(
    @InjectRepository(ActionTrigger)
    private readonly actionRepository: Repository<ActionTrigger>
  ) {}

  async create(
    userId: number,
    isAction: boolean,
    serviceId: number,
    actionId: number,
    parameters: any
  ): Promise<ActionTrigger | null> {
    return await this.actionRepository.save({
      userId,
      isAction,
      serviceId,
      actionId,
      parameters,
    });
  }

  async findByUser(userId: number): Promise<ActionTrigger[]> {
    return await this.actionRepository.findBy({ userId });
  }

  async update(id: number, actionData: Partial<ActionTrigger>): Promise<void> {
    await this.actionRepository.update(id, actionData);
  }

  async delete(id: number): Promise<void> {
    await this.actionRepository.delete(id);
  }
}
