import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Match } from './match.entity';

@Entity()
export class Message extends BaseEntity {
  @ManyToOne(() => Match)
  match: Match;

  @ManyToOne(() => User)
  sender: User;

  @Column()
  content: string;

  @Column({ type: 'datetime' })
  sentAt: Date;

  @Column({ default: false })
  isRead: boolean;
}
