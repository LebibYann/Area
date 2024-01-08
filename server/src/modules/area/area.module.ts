import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "./area.entity";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { ScheduleModule } from "@nestjs/schedule";
import { CronLoopService } from "./cronLoop.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Area]),
    ScheduleModule.forRoot(),
],
  controllers: [AreaController],
  providers: [AreaService, CronLoopService],
  exports: []
})
export class AreaModule {}
