import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { firstValueFrom } from "rxjs";
import { services } from "src/modules/about/about.const";
import { Credential } from "src/modules/auth/entities/credential.entity";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @OnEvent(services[3].actions[1].name)
  async getPlaybackState (data: {credentials: Credential, parameters: any}): Promise<boolean> {
    const apiEndpoint = "https://api.spotify.com/v1/me/player";
    const headers = {
      Authorization: `Bearer ${data.credentials.accessToken}`,
    };
    try {
      const response = await firstValueFrom(this.httpService.get(apiEndpoint, { headers }));
      if (response.status !== 200) {
        throw new Error(`API call failed (Spotify): ${response.statusText}`);
      }
      return response.data.is_playing;
    } catch (error) {
      console.log(`API call failed (Spotify): ${error.message}`);
      return false;
    }
  }
}