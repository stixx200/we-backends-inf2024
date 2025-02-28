import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { CalendarEvent } from './calendar-event.entity';

@Entity()
export class InvitedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => CalendarEvent)
  calendarEvent: CalendarEvent;

  @Column({
    type: 'text',
    enum: ['accepted', 'declined', 'pending'],
    default: 'pending',
  })
  status: 'accepted' | 'declined' | 'pending';
}
