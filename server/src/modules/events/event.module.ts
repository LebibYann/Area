import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./event.entity";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { AboutService } from "../about/about.service";
import { AboutModule } from "../about/about.module";
import { CredentialService } from "../auth/services/credential.service";
import { Credential } from "../auth/entities/credential.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Credential]),
    AboutModule,
  ],
  controllers: [EventController],
  providers: [EventService, AboutService, CredentialService],
  exports: []
})
export class EventModule {}