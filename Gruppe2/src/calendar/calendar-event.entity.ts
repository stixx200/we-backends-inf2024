import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from '../user/user.entity';
import { InvitedUser } from './invited-user.entity';

@Entity()
export class CalendarEvent extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
  end: Date;

  @ManyToOne(() => User)
  createdBy: User;

  @OneToMany(() => InvitedUser, (invitedUser) => invitedUser.calendarEvent, {
    cascade: true,
  })
  invitedUsers: InvitedUser[];
}
