import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AreaService } from "./area.service";
import { EventService } from "../../events/event.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { services, ServiceName } from "../../about/about.const";
import axios from "axios";
import { CredentialService } from "../../auth/services/credential.service";
import { TimerService } from "../../providers/services/timer.service";
import { WeatherService } from "../../providers/services/weather.service";
import { TwitterService } from "../../providers/services/twitter.service";
import { GoogleService } from "../../providers/services/google.service";
import { GithubService } from "../../providers/services/github.service";
import { AboutService } from "src/modules/about/about.service";

@Injectable()
export class CronLoopService {
  private readonly logger = new Logger(CronLoopService.name);

  constructor(
    private readonly areaService: AreaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventService: EventService,
    private readonly credentialService: CredentialService,
    private readonly timerService: TimerService,
    private readonly weatherService: WeatherService,
    private readonly twitterService: TwitterService,
    private readonly googleService: GoogleService,
    private readonly githubService: GithubService,
    private readonly aboutService: AboutService
  ) {}

  private readonly aboutJson = this.aboutService.getAboutJson();

  @Cron("*/10 * * * * *") // every 1 minute
  async handleCron() {
    this.logger.debug("Called every 1 minute");
    const areas = await this.areaService.findAll();
    this.logger.debug(`Discord`)
    //makeDiscordcall(this.eventEmitter, "test");
    this.logger.debug(`Found ${areas.length} areas`);
    areas.forEach(async (area) => {
      // Get the trigger
      const trigger = await this.eventService.findById(area.triggerId);
      if (!trigger) {
        return;
      }
      if (trigger.serviceId == 8) {
        const currentTime = await this.timerService.getCurrentTime();
        if (currentTime && currentTime >= trigger.parameters.time) {
          this.logger.debug(`Triggering timer for user ${area.userId}`);
          this.eventEmitter.emit("Timer", true);
          this.logger.debug(`Removing area for user ${area.userId}`);
          await this.areaService.delete(area.id);
          this.logger.debug(`Removing timer for user ${area.userId}`);
          await this.eventService.delete(area.triggerId);
        }
        return;
      }
      // Get credentials for the user and the service
      const credentials = await this.credentialService.findOneByUserAndService(
        area.userId,
        ServiceName[trigger.serviceId]
      );
      if (!credentials) {
        return;
      }
      this.logger.debug(ServiceName[trigger.serviceId], ServiceName.TIMER)
      switch (ServiceName[trigger.serviceId]) {
        case ServiceName.GMAIL:
          const lastmail = await this.googleService.isLastMailRead(credentials.accessToken);
          if (lastmail && lastmail == true) {
            this.logger.debug(`Triggering gmail for user ${area.userId}`);
          }
          break;
        case ServiceName.GITHUB:
          const issues = await this.githubService.getGithubIssues(credentials.accessToken);
          if (issues) { //logique a faire ici
            this.logger.debug(`Triggering github for user ${area.userId}`);
          }
          break;
        case ServiceName.TWITTER:
          const trends = await this.twitterService.getTwitterTrends(credentials.accessToken, trigger.parameters.word1, trigger.parameters.word2, trigger.parameters.word3, trigger.parameters.word4);
          if (trends) { //logique a faire ici
            this.logger.debug(`Triggering twitter for user ${area.userId}`);
          }
          break;
        case ServiceName.WEATHER:
          const currentTemp = await this.weatherService.getCurrentWeather("");
          if (currentTemp && currentTemp >= trigger.parameters.temp) {
            this.logger.debug(`Triggering weather for user ${area.userId}`);
          }
          break;
        case ServiceName.SPOTIFY:
          makeApiCallSpotify(this.eventEmitter, credentials.accessToken);
          break;
        default:
          return;
      }
    });
  }

  async triggerAction(actionId: number): Promise<void> {
    // Get the action
    const action = await this.eventService.findById(actionId);
    if (!action) {
      throw new Error("TriggerAction: Invalid action id.");
    }
    // Get credentials for the user and the service
    const credentials = await this.credentialService.findOneByUserAndService(
      action.userId,
      ServiceName[action.serviceId]
    );
    if (!credentials) {
      throw new Error("TriggerAction: No credentials for this service.");
    }
    this.eventEmitter.emit(
      this.aboutJson.server.services[action.serviceId].reactions[action.eventId].name,
      action.parameters
    );
  }
}


async function makeApiCallSpotify(eventEmitter: EventEmitter2, accessToken:string): Promise<any> {
  const apiSpotifyGetPlaylist = 'https://api.spotify.com/v1/me/playlists';
  const apiSpotifyGetPlaybackState = 'https://api.spotify.com/v1/me/player';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios(apiSpotifyGetPlaylist, {headers});
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      eventEmitter.emit('NewPlaylist', true);
    }
  } catch (error) {
    console.log(`API call failed (Spotify): ${error.message}`);
    return false;
  }
  return false;
}