import { Module } from "@nestjs/common";
import { TimerService } from "./services/timer.service";
import { HttpModule } from "@nestjs/axios";
import { DiscordService } from "./services/discord.service";
import { SpotifyService } from "./services/spotify.service";
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
    GoogleService
  ],
  exports: [
    TimerService,
    DiscordService,
    SpotifyService,
    GoogleService
  ]
})
export class ProvidersModule {}
