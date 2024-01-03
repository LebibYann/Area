import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActionTrigger } from "./actionTrigger.entity";
import { ActionController } from "./action.controller";
import { ActionTriggerService } from "./actionTrigger.service";

@Module({
  imports: [TypeOrmModule.forFeature([ActionTrigger])],
  controllers: [ActionController],
  providers: [ActionTriggerService],
  exports: []
})
export class ActionModule {}