import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Area } from "./area.entity";
import { Repository } from "typeorm";

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>
  ) {}

  async create(
    userId: number,
    serviceId: number,
    actionId: number
  ): Promise<Area | null> {
    return await this.areaRepository.save({
      userId,
      serviceId,
      actionId,
    });
  }

  async findByUser(userId: number): Promise<Area[]> {
    return await this.areaRepository.findBy({ userId });
  }

  async findById(id: number): Promise<Area | null> {
    return await this.areaRepository.findOneBy({ id });
  }

  async update(id: number, areaData: Partial<Area>): Promise<void> {
    await this.areaRepository.update(id, areaData);
  }

  async delete(id: number): Promise<void> {
    await this.areaRepository.delete(id);
  }
}
