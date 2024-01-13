import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "./area.entity";
import { AreaController } from "./area.controller";
import { AreaService } from "./services/area.service";
import { ScheduleModule } from "@nestjs/schedule";
import { CronLoopService } from "./services/cronLoop.service";
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServiceEmitter } from './services/emitter.service';
import { EventService } from "../events/event.service";
import { CredentialService } from "../auth/services/credential.service";
import { AboutService } from "../about/about.service";
import { Credential } from "../auth/entities/credential.entity";
import { TimerService } from "../providers/services/timer.service";
import { WeatherService } from "../providers/services/weather.service";
import { TwitterService } from "../providers/services/twitter.service";
import { GoogleService } from "../providers/services/google.service";
import { GithubService } from "../providers/services/github.service";
import { HttpModule, HttpService } from "@nestjs/axios";
import { EventModule } from "../events/event.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Area, Event, Credential]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    HttpModule,
    EventModule
],
  controllers: [AreaController],
  providers: [AreaService, CronLoopService, CredentialService, AboutService, TimerService, ServiceEmitter, WeatherService, TwitterService, GoogleService, GithubService],
  exports: []
})
export class AreaModule {}
