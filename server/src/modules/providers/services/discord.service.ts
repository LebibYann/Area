import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DiscordService {
  constructor(
    private readonly httpService: HttpService
  ) { }

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
      console.log(`API call failed (Discord): ${error.message}`);
    }
  }
}
