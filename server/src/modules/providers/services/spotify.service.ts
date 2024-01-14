import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { firstValueFrom } from "rxjs";
import { services } from "src/modules/about/about.const";
import { Credential } from "src/modules/auth/entities/credential.entity";
import { SpotifyDto } from "src/modules/area/dtos/spotifyActions.dto";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(SpotifyService.name);

  @OnEvent(services[3].actions[0].name)
  async isNewFollower (data: {credentials: Credential, parameters: any}): Promise<boolean> {
    const nbFollowers = await this.getNbFollowers(data.credentials.accessToken);
    if (nbFollowers > data.parameters.param1) {
      return true;
    }
    return false;
  }

  @OnEvent(services[3].actions[2].name)
  async isFollowersCapReached (data: {credentials: Credential, parameters: any}): Promise<boolean> {
    const nbFollowers = await this.getNbFollowers(data.credentials.accessToken);
    if (nbFollowers >= data.parameters.param1) {
      return true;
    }
    return false;
  }

  async getNbFollowers (accessToken: string): Promise<number> {
    const apiEndpoint = "https://api.spotify.com/v1/me";
    this.logger.debug(`Spotify accessToken: ${accessToken}`);
    try {
      const response = await firstValueFrom(this.httpService.get(apiEndpoint,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
        ));
      if (response.status !== 200) {
        throw new Error(`API call failed (Spotify): ${response.statusText}`);
      }
      return response.data.followers.total;
    } catch (error) {
      this.logger.error(`API call failed (Spotify): ${error.message}`);
      return 0;
    }
  }

  @OnEvent(services[3].actions[1].name)
  async getPlaybackState (data: {credentials: Credential, parameters: any}): Promise<boolean> {
    const apiEndpoint = "https://api.spotify.com/v1/me/player";
    const headers = {
      Authorization: `Bearer ${data.credentials.accessToken}`,
    };
    this.logger.debug(`Spotify accessToken: ${data.credentials.accessToken}`);
    try {
      const response = await firstValueFrom(this.httpService.get(apiEndpoint,
        {
          headers: {
            Authorization: `Bearer ${data.credentials.accessToken}`,
          }
        }
        ));
      if (response.status !== 200) {
        throw new Error(`API call failed (Spotify): ${response.statusText}`);
      }
      return response.data.is_playing;
    } catch (error) {
      this.logger.error(`API call failed (Spotify): ${error.message}`);
      return false;
    }
  }
}