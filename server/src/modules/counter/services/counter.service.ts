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
    let counter = await this.counterRepository.findOneBy({id: 1});
    if (!counter) {
      counter = this.counterRepository.create();
    }
    counter.count += 1;
    await this.counterRepository.save(counter);
    return counter.count;
  }
}
