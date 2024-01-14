import { Module } from "@nestjs/common";
import { TimerService } from "./services/timer.service";
import { HttpModule } from "@nestjs/axios";
import { DiscordService } from "./services/discord.service";
import { SpotifyService } from "./services/spotify.service";
import { GithubService } from "./services/github.service";
import { TwitterService } from "./services/twitter.service";
import { WeatherService } from "./services/weather.service";
import { GoogleService } from "./services/google.service";


@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
  providers: [
    TimerService,
    DiscordService,
    SpotifyService,
    GithubService,
    TwitterService,
    WeatherService,
    GoogleService
  ],
  exports: [
    TimerService,
    DiscordService,
    SpotifyService,
    GithubService,
    TwitterService,
    WeatherService,
    GoogleService
  ]
})
export class ProvidersModule {}
