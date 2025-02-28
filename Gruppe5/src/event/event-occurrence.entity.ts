import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Event } from './event.entity';
import { EventOccurrenceRegistration } from './event-occurrence-registration.entity';

// info: BaseEntity ist nicht notwendig, da location eingebettet ist in die occurrence
export class EventLocation {
  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  state: string; // Bundesland
  @Column()
  country: string;
  @Column({ nullable: true })
  postalCode?: string;
  @Column({ nullable: true })
  latitude?: number;
  @Column({ nullable: true })
  longitude?: number;
}

@Entity()
export class EventOccurrence extends BaseEntity {
  @ManyToOne(() => Event)
  event: Event;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate?: Date;

  @Column(() => EventLocation)
  location: EventLocation;

  @OneToMany(
    () => EventOccurrenceRegistration,
    (registraion) => registraion.eventOccurrence,
  )
  registrations: EventOccurrenceRegistration[];
}
