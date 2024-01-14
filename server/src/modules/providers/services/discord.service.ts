import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { firstValueFrom } from "rxjs";
import { DiscordSendMessagesDto } from "src/modules/area/dtos/discordActions.dto";
import { EventService } from "src/modules/events/event.service";
import { services } from "../../about/about.const";
import { send } from "process";

@Injectable()
export class DiscordService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  logger = new Logger(DiscordService.name);

  @OnEvent(services[2].reactions[0].name)
  handleDiscord0(data: {credentials: any, parameters: DiscordSendMessagesDto}): void {
    this.logger.debug(`Sending message triggered`);
    this.sendMessage(data.parameters.param1);
  }

  async sendMessage (message: string): Promise<void> {
    const baseURL = "https://discord.com/api/webhooks";
    const webhookId = "1194974339469148211/pZdLvt2LfgfTXnsImu3iSizmbDla4uMrDkB4knBw4Es9Achkv571IiRaT4vO8rdWVtWD";

    try {
      const response = await firstValueFrom(this.httpService.post(
        `${baseURL}/${webhookId}`,
        {
          content: message,
        })
      );
      if (response.status !== 200) {
        throw new Error(`API call failed (Discord): ${response.statusText}`);
      }
    } catch (error) {
      this.logger.error(`API call failed (Discord): ${error.message}`);
    }
  }
}
