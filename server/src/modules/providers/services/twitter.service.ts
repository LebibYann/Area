import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class TwitterService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(TwitterService.name);

  async getTwitterTrends(accessToken:string, word1:string, word2:string, word3:string, word4:string): Promise<any> {
    const apiTwitterGetTrends = "https://api.twitter.com/1.1/trends/place.json?id=1";

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await firstValueFrom(this.httpService.get(apiTwitterGetTrends, {headers}));
      if (response.status !== 200) {
        throw new Error(`API call failed (Twitter): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Twitter): ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API call failed (Twitter): ${error.message}`);
      return 0;
    }
  }

  async makeTweet(accessToken:string, text:string): Promise<any> {
    const maketweet = 'https://api.twitter.com/2/tweets/compose';

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      status: text,
    };
    try {
      const response = await firstValueFrom(this.httpService.post(maketweet, data, {headers}));
      if (response.status !== 200) {
        throw new Error(`API call failed (Twitter): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Twitter): ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API call failed (Twitter): ${error.message}`);
      return 0;
    }
  }
}