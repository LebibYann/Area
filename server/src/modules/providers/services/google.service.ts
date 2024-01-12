import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(GoogleService.name);

  async isLastMailRead(accessToken:string): Promise<any> {
    const apiGmailGetLastMail = `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=-from%3Ame&access_token=${accessToken}`;

    try {
      const response = await firstValueFrom(this.httpService.get(apiGmailGetLastMail));
      if (response.status !== 200) {
        throw new Error(`API call failed (Google): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Google): ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API call failed (Google): ${error.message}`);
      return 0;
    }
  }
}