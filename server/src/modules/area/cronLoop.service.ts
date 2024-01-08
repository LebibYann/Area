import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AreaService } from "./area.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import axios from "axios";

@Injectable()
export class CronLoopService {
  private readonly logger = new Logger(CronLoopService.name);

  constructor(private readonly areaService: AreaService, private readonly eventEmitter: EventEmitter2) {}

  // timer
  @Cron("1 * * * * *") // every 1 minute
  async handleCron() {
    this.logger.debug("Called every 1 minute");
    const areas = await this.areaService.findAll();
    const apiTimer = "http://worldtimeapi.org/api/timezone/France";
    const apiWeather = "http://api.weatherapi.com/v1/current.json?key=3f83f85b8aa441e7a0282718240801&q=";
    try {
      const response = await axios.get(apiTimer);
    } catch (error) {
      this.logger.error('Error fetching data from API: ${error.message}');
    }
    areas.forEach((area) => {
      this.logger.debug(`Area: ${area.id}`);
      if (1) { //ici mettre en place le check si l'heure est bonne 
        this.eventEmitter.emit('Timer', true);
      }
    });
  }  

  // //weather
  // @Cron("* */30 * * * *") // every 30 minutes
  // async handleCronLong() {
  //   this.logger.debug("Called every 5 seconds");
  //   const areas = await this.areaService.findAll();
  //   const apiWeather = "http://api.weatherapi.com/v1/current.json?key=3f83f85b8aa441e7a0282718240801&q=";
  //   areas.forEach((area) => {
  //     this.logger.debug(`Area: ${area.id}`);
  //     try {
  //       const response = await axios.get(apiWeather);
  //       if (response.status === 200 && response.data && response.data.datetime) {
  //         this.eventEmitter.emit('Timer', response.data.datetime);
  //       }
  //     } catch (error) {
  //       this.logger.error('Error fetching data from API: ${error.message}');
  //     }
  //   });
  // }
}
