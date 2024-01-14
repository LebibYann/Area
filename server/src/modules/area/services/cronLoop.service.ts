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

  private readonly servicesNames = Object.keys(ServiceName)

  @Cron("*/10 * * * * *") // every 1 minute
  async handleCron() {
    this.logger.debug("Called every 10 seconds");
    const areas = await this.areaService.findAll();
    this.logger.debug(`Found ${areas.length} areas`);
    areas.forEach(async (area) => {
      // Get the trigger
      const trigger = await this.eventService.findById(area.triggerId);
      if (!trigger) {
        return;
      }
      if (trigger.serviceId == 7 || trigger.serviceId == 8) {
        const triggeredResults = await this.eventEmitter.emitAsync(
          services[trigger.serviceId].actions[trigger.eventId].name,
          trigger.parameters
        );
        const triggered = triggeredResults.some((result) => result);
        this.logger.debug(`Triggered: ${triggered}`);
        if (triggered) {
          this.triggerAction(area.actionId);
          this.logger.debug(`Removing area for user ${area.userId}`);
          await this.areaService.delete(area.id);
          this.logger.debug(`Removing trigger for user ${area.userId}`);
          await this.eventService.delete(area.triggerId);
        }
        return;
      }
      // Get credentials for the user and the service
      const credentials = await this.credentialService.findOneByUserAndService(
        area.userId,
        ServiceName[this.servicesNames[trigger.serviceId]]
      );
      if (!credentials)
        return;
      const triggeredResults = await this.eventEmitter.emitAsync(
        services[trigger.serviceId].actions[trigger.eventId].name,
        { credentials: credentials, parameters: trigger.parameters }
      );
      const triggered = triggeredResults.some((result) => result);
      this.logger.debug(`Triggered: ${triggered}`);
      // if (!triggered)
      //   return;
      this.triggerAction(area.actionId);
      this.logger.debug(`Removing area for user ${area.userId}`);
      await this.areaService.delete(area.id);
      this.logger.debug(`Removing trigger for user ${area.userId}`);
      await this.eventService.delete(area.triggerId);
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
      ServiceName[this.servicesNames[action.serviceId]]
    );
    if (!credentials) {
      throw new Error("TriggerAction: No credentials for this service.");
    }
    this.eventEmitter.emit(
      this.aboutJson.server.services[action.serviceId].reactions[action.eventId].name,
      { credentials, parameters: action.parameters }
    );
  }
}
