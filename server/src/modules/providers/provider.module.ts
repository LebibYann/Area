import { Module } from "@nestjs/common";
import { TimerService } from "./services/timer.service";
import { HttpModule } from "@nestjs/axios";
import { DiscordService } from "./services/discord.service";
import { SpotifyService } from "./services/spotify.service";
import { GithubService } from "./services/github.service";

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
  ],
  exports: [
    TimerService,
    DiscordService,
    SpotifyService,
    GithubService,
  ]
})
export class ProvidersModule {}
