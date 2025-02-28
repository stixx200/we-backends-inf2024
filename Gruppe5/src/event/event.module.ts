import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventOccurrence } from './event-occurrence.entity';
import { EventOccurrenceRegistration } from './event-occurrence-registration.entity';
import { InvitedUser } from './invited-user.entity';
import { Ticket } from './ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      EventOccurrence,
      EventOccurrenceRegistration,
      InvitedUser,
      Ticket,
    ]),
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
