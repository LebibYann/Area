import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ServiceEmitter {
    @OnEvent('Timer')
    handleEvent(data: any) {
        console.log('Event triggered');
    }
}