import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ServiceEmitter {
    @OnEvent('Timer')
    handleTimer(data: any) {
        console.log('Event triggered');
    }

    @OnEvent('Weather')
    handleWeather(data: any) {
        console.log('Event triggered');
    }
}