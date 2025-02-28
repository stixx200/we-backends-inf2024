import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './calendar-event.entity';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { InvitedUser } from './invited-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, InvitedUser])],
  providers: [CalendarService],
  controllers: [CalendarController],
  exports: [CalendarService],
})
export class CalendarModule {}
