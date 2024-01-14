import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { firstValueFrom } from "rxjs";
import { services } from "src/modules/about/about.const";
import { W } from "typeorm";

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(WeatherService.name);

  @OnEvent(services[7].actions[0].name)
  async isTriggered (data: {param1: string, param2: number}): Promise<boolean> {
    const currentTemp = await this.getCurrentWeather(data.param1);
    this.logger.debug(`Current temp: ${currentTemp}`);
    this.logger.debug(`Trigger temp: ${data.param2}`);
    this.logger.debug(currentTemp == data.param2);
    return currentTemp == data.param2;
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

  @OnEvent(services[7].actions[1].name)
  async isTriggered2 (data: {param1: string, param2: number}): Promise<boolean> {
    const currentWind = await this.getCurrentWind(data.param1);
    this.logger.debug(`Current wind: ${currentWind}`);
    this.logger.debug(`Trigger wind: ${data.param2}`);
    if (currentWind > data.param2)
      return true;
    return false;
  }

  async getCurrentWind (location:string): Promise<number> {
    const apiWeather = `http://api.weatherapi.com/v1/current.json?key=3f83f85b8aa441e7a0282718240801&q=${location}`;
    try {
        const response = await firstValueFrom(this.httpService.get(apiWeather));
        if (response.status !== 200) {
          throw new Error(`API call failed (Weather): ${response.statusText}`);
        }
        this.logger.debug(`API call success (Weather): ${response.data}`);
        return response.data.current.wind_kph;
    } catch (error) {
      this.logger.error(`API call failed (Weather): ${error.message}`);
      return 0;
    }
  }
}