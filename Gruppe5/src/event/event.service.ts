import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(event: Event): Promise<Event> {
    return await this.eventsRepository.save(event);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Event[]> {
    return await this.eventsRepository.find();
  }

  async readOne(id: number): Promise<Event | null> {
    const result = await this.eventsRepository.find({
      where: { id },
      relations: {
        invitedUsers: true,
      },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Event>) {
    return await this.eventsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
