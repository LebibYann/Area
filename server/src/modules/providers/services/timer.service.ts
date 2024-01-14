import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { firstValueFrom } from "rxjs";
import { services } from "src/modules/about/about.const";

@Injectable()
export class TimerService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(TimerService.name);

  @OnEvent(services[8].actions[0].name)
  async isTriggered (data: {param1: number}): Promise<boolean> {
    const currentTime = await this.getCurrentTime();
    this.logger.debug(`Current time: ${currentTime}`);
    this.logger.debug(`Trigger time: ${data.param1}`);
    this.logger.debug(currentTime >= data.param1);
    return currentTime >= data.param1;
  }

  async getCurrentTime (): Promise<number> {
    const apiTimer = "http://worldtimeapi.org/api/timezone/Europe/Paris";
    try {
        const response = await firstValueFrom(this.httpService.get(apiTimer));
        if (response.status !== 200) {
          throw new Error(`API call failed (Timer): ${response.statusText}`);
        }
        return response.data.unixtime;
    } catch (error) {
      this.logger.error(`API call failed (Timer): ${error.message}`);
      return 0;
    }
  }
}
