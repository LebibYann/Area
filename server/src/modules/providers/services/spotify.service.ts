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
  async getPlaylist (data: {credentials: Credential, parameters: any}): Promise<boolean> {
    const apiSpotifyGetPlaylist = 'https://api.spotify.com/v1/me/playlists';
    const headers = {
      Authorization: `Bearer ${data.credentials.accessToken}`,
    };
    try {
      const response = await firstValueFrom(this.httpService.get(apiSpotifyGetPlaylist, { headers }));
      if (response.status !== 200) {
        throw new Error(`API call failed (Spotify): ${response.statusText}`);
      }
      return response.data.is_playing;
    } catch (error) {
      console.log(`API call failed (Spotify): ${error.message}`);
      return false;
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
      console.log(`API call failed (Spotify): ${error.message}`);
      return false;
    }
  }

  @OnEvent(services[3].reactions[0].name)
  handleSpotify0(data: SpotifyDto) {
    console.log(services[2].reactions[0].name, 'triggered');
    this.playsong(data.token);
  }

  async playsong (accessToken: string): Promise<void> {

    const baseURL = 'https://api.spotify.com/v1/me/player/play';

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(this.httpService.post(baseURL, {headers}));
      if (response.status !== 200) {
        throw new Error(`API call failed (Discord): ${response.statusText}`);
      }
    } catch (error) {
      console.log(`API call failed (Discord): ${error.message}`);
    }
  }
}