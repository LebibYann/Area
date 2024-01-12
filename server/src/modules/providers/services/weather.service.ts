import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { firstValueFrom } from "rxjs";
import { services } from "src/modules/about/about.const";

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(WeatherService.name);

  @OnEvent(services[7].actions[0].name)
  async isTriggered (data: {temp: number}, location:string): Promise<boolean> {
    const currentTemp = await this.getCurrentWeather(location);
    this.logger.debug(`Current temp: ${currentTemp}`);
    this.logger.debug(`Trigger temp: ${data.temp}`);
    this.logger.debug(currentTemp >= data.temp);
    return currentTemp >= data.temp;
  }

  async getCurrentWeather (location:string): Promise<number> {
    const apiWeather = `http://api.weatherapi.com/v1/current.json?key=3f83f85b8aa441e7a0282718240801&q=${location}`;
    try {
        const response = await firstValueFrom(this.httpService.get(apiWeather));
        if (response.status !== 200) {
          throw new Error(`API call failed (Weather): ${response.statusText}`);
        }
        this.logger.debug(`API call success (Weather): ${response.data}`);
        return response.data.current.temp_c;
    } catch (error) {
      this.logger.error(`API call failed (Weather): ${error.message}`);
      return 0;
    }
  }
}