import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEvent } from './calendar-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarRepository: Repository<CalendarEvent>,
  ) {}

  async createEvent(calendar: CalendarEvent): Promise<CalendarEvent> {
    return await this.calendarRepository.save(calendar);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAllEvents(): Promise<CalendarEvent[]> {
    return await this.calendarRepository.find();
  }

  async readOneEvent(id: number): Promise<CalendarEvent | null> {
    const result = await this.calendarRepository.find({
      where: { id },
      relations: {
        invitedUsers: {
          user: true,
        },
      },
    });
    return result ? result[0] : null;
  }

  async updateEvent(id: number, data: Partial<CalendarEvent>) {
    return await this.calendarRepository.update(id, data);
  }

  async deleteEvent(id: number): Promise<void> {
    await this.calendarRepository.delete(id);
  }
}
