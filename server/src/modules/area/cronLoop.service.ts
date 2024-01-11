import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AreaService } from "./area.service";
import { EventService } from "../events/event.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { services } from "../about/about.const";
import axios from "axios";

@Injectable()
export class CronLoopService {
  private readonly logger = new Logger(CronLoopService.name);

  constructor(private readonly areaService: AreaService, private readonly eventEmitter: EventEmitter2) {}

  @Cron("*/10 * * * * *") // every 1 minute
  async handleCron() {
    this.logger.debug("Called every 1 minute");
    const areas = await this.areaService.findAll();
    // makeApiCallTimer(this.eventEmitter, "test"); // ok
    // makeApiCallWeather("Paris"); // ok
    makeDiscordcall(this.eventEmitter, "test");
    /* 
      users.forEach(user) => {
        user.areas.forEach(area) => {
          switch(area.triggers.serviceId) {
            case 0 && area.triggers.eventId: 
                makeApiCallGmail(eventEmitter, user.accestoken['Google']);
                break;
            case 2:
               recursiveSwitch(id + 2)
               break;
            default:
               return;
          }
        }
      }
    */
    areas.forEach((area) => {
      this.logger.debug(`Area: ${area.id}`);
    });
  }
}


async function makeApiCallGmail(eventEmitter: EventEmitter2, accessToken:string): Promise<any> {
  const apiGmailGetLastMail = `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=-from%3Ame&access_token=${accessToken}`;

  try {
    const response = await axios(apiGmailGetLastMail);
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      eventEmitter.emit('LastMailRead', true);
    }
  } catch (error) {
    console.log(`API call failed (Gmail): ${error.message}`);
    return false;
  }
  return false;
}

async function makeApiCallGithub(eventEmitter: EventEmitter2, accessToken:string): Promise<any> {
  const apiGithubGetIssues = 'https://api.github.com/issues';

  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${accessToken}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
  try {
    const response = await axios(apiGithubGetIssues, {headers});
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      eventEmitter.emit('GithubNewIssues', true);
    }
  } catch (error) {
    console.log(`API call failed (Github): ${error.message}`);
    return false;
  }
  return false;
}

async function makeApiCallTwitter(eventEmitter: EventEmitter2, accessToken:string, word1:string, word2:string, word3:string, word4:string): Promise<any> {
  const apiTwitterGetTrends = "https://api.twitter.com/1.1/trends/place.json?id=1";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios(apiTwitterGetTrends);
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      eventEmitter.emit('TwitterTrends', true);
    }
  } catch (error) {
    console.log(`API call failed (Twitter): ${error.message}`);
    return false;
  }
  return false;
}

async function makeApiCallTimer(eventEmitter: EventEmitter2, initialTime:string): Promise<any> {
  const apiTimer = "http://worldtimeapi.org/api/timezone/Europe/Paris";
  try {
    const response = await axios(apiTimer);
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      eventEmitter.emit('Timer', true);
    }
  } catch (error) {
    console.log(`API call failed (Timer): ${error.message}`);
    return false;
  }
  return false;
}

async function makeApiCallWeather(eventEmitter: EventEmitter2, location:string): Promise<any> {
  const apiWeather = `http://api.weatherapi.com/v1/current.json?key=3f83f85b8aa441e7a0282718240801&q=${location}`;
  try {
    const response = await axios(apiWeather);
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      eventEmitter.emit('Weather', true);
    }
  } catch (error) {
    console.log(`API call failed (Weather): ${error.message}`);
    return false;
  }
  return false;
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

async function makeDiscordcall(eventEmitter: EventEmitter2, accessToken:string): Promise<any> {
  eventEmitter.emit(services[2].reactions[0].name, true);
  return true;
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