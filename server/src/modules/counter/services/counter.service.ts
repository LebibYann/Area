import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from '../entities/counter.entity';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter)
    private counterRepository: Repository<Counter>,
  ) {}

  async incrementCounter(): Promise<number> {
    console.log('incrementCounter');
    let counter = null;
    try {
      counter = await this.counterRepository.findOneBy({ id: 1 });
    } catch (e) {
      console.log(e);
    }
    if (!counter) {
      counter = this.counterRepository.create();
      counter.count = 0;
    }
    counter.count += 1;
    await this.counterRepository.save(counter);
    return counter.count;
  }
}
