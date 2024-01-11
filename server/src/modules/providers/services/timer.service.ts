import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class TimerService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(TimerService.name);

  async getCurrentTime (): Promise<number> {
    const apiTimer = "http://worldtimeapi.org/api/timezone/Europe/Paris";
    try {
        const response = await firstValueFrom(this.httpService.get(apiTimer));
        if (response.status !== 200) {
          throw new Error(`API call failed (Timer): ${response.statusText}`);
        }
        this.logger.debug(`API call success (Timer): ${response.data}`);
        return response.data.unixtime;
    } catch (error) {
      this.logger.error(`API call failed (Timer): ${error.message}`);
      return 0;
    }
  }
}
