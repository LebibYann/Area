import { Controller, Get } from '@nestjs/common';
import { CounterService } from '../services/counter.service';

@Controller()
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get('/')
  async getHello(): Promise<string> {
    const count = await this.counterService.incrementCounter();
    return `This page has been visited ${count} times`;
  }
}
