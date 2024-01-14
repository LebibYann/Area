import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./event.entity";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { AboutService } from "../about/about.service";
import { AboutModule } from "../about/about.module";
import { CredentialService } from "../auth/services/credential.service";
import { Credential } from "../auth/entities/credential.entity";
import { ProvidersModule } from "../providers/provider.module";
import { TimerService } from "../providers/services/timer.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Credential]),
    AboutModule,
    ProvidersModule,
    HttpModule
  ],
  controllers: [EventController],
  providers: [EventService, AboutService, CredentialService, TimerService],
  exports: [EventService]
})
export class EventModule {}