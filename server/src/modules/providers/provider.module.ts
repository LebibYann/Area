import { Module } from "@nestjs/common";
import { TimerService } from "./services/timer.service";
import { HttpModule } from "@nestjs/axios";
import { DiscordService } from "./services/discord.service";
import { SpotifyService } from "./services/spotify.service";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
  providers: [
    TimerService,
    DiscordService,
    SpotifyService
  ],
  exports: [
    TimerService,
    DiscordService,
    SpotifyService
  ]
})
export class ProvidersModule {}
