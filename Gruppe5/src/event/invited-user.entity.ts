import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Event } from './event.entity';

@Entity()
export class InvitedUser extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Event)
  event: Event;

  @Column({ type: 'datetime' })
  invitedAt: Date;

  @Column({
    type: 'text',
    enum: ['accepted', 'declined', 'pending'],
    default: 'pending',
  })
  status: 'accepted' | 'declined' | 'pending';

  @Column({ type: 'datetime', nullable: true })
  respondedAt?: Date;
}
