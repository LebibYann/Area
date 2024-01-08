import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AreaService } from "./area.service";

@Injectable()
export class CronLoopService {
  private readonly logger = new Logger(CronLoopService.name);

  constructor(private readonly areaService: AreaService) {}

  @Cron("*/5 * * * * *") // every 5 seconds
  async handleCron() {
    this.logger.debug("Called every 5 seconds");
    const areas = await this.areaService.findAll();
    areas.forEach((area) => {
      this.logger.debug(`Area: ${area.id}`);
    });
  }
}
