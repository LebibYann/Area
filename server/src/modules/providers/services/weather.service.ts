import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(WeatherService.name);

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