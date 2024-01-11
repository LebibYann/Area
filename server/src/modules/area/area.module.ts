import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "./area.entity";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { ScheduleModule } from "@nestjs/schedule";
import { CronLoopService } from "./cronLoop.service";
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServiceEmitter } from './emitter.service';
import { EventService } from "../events/event.service";
import { CredentialService } from "../auth/services/credential.service";
import { AboutService } from "../about/about.service";
import { Credential } from "../auth/entities/credential.entity";
import { TimerService } from "../providers/services/timer.service";
import { HttpModule, HttpService } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([Area, Event, Credential]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    HttpModule
],
  controllers: [AreaController],
  providers: [AreaService, CronLoopService],
  exports: []
})
export class AreaModule {}
