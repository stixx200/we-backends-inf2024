import { Event } from 'src/event/event.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';

@Entity()
export class Invitation extends BaseEntity {
  @ManyToOne(() => Event)
  event: Event;

  @Column()
  email: string;

  @Column({ type: 'datetime' })
  invitedAt: Date;

  @Column({ nullable: true })
  message?: string;
}
