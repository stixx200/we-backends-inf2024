import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { EventOccurrence } from './event-occurrence.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class EventOccurrenceRegistration extends BaseEntity {
  @ManyToOne(() => EventOccurrence)
  eventOccurrence: EventOccurrence;

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'text',
    enum: ['registered', 'cancelled', 'pending'],
    default: 'pending',
  })
  status: 'registered' | 'cancelled' | 'pending';

  @Column({ type: 'datetime' })
  registrationDate: Date;
}
