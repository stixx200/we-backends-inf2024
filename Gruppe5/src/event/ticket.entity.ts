import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { EventOccurrenceRegistration } from './event-occurrence-registration.entity';

@Entity()
export class Ticket extends BaseEntity {
  @ManyToOne(() => EventOccurrenceRegistration)
  eventOccurrenceRegistration: EventOccurrenceRegistration;

  @Column()
  ticketNumber: string;

  @Column({ nullable: true })
  seatInfo: string;
}
