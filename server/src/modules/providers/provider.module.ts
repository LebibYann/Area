import { Module } from "@nestjs/common";
import { TimerService } from "./services/timer.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
    providers: [
      TimerService
    ],
  exports: []
})
export class ProvidersModule {}
