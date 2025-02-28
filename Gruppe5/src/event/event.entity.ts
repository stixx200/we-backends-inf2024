import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { InvitedUser } from './invited-user.entity';
import { EventOccurrence } from './event-occurrence.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  creator: User;

  @Column({
    type: 'text',
    enum: ['public', 'private', 'unlisted'],
  })
  visibility: 'public' | 'private' | 'unlisted';

  @Column({
    type: 'text',
    enum: ['music', 'sports', 'culture', 'other'],
  })
  category: 'music' | 'sports' | 'culture' | 'other';

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ nullable: true })
  maxParticipants?: number;

  @ManyToMany(() => User)
  @JoinTable()
  managers: User[];

  @OneToMany(() => InvitedUser, (invitedUser) => invitedUser.event)
  invitedUsers: InvitedUser[];

  @OneToMany(
    () => EventOccurrence,
    (eventOccurrence) => eventOccurrence.event,
    { cascade: true },
  )
  eventOccurrences: EventOccurrence[];
}
