import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Message } from './message.entity';

@Entity()
export class Match extends BaseEntity {
  @ManyToOne(() => User)
  user1: User;

  @ManyToOne(() => User)
  user2: User;

  @Column({ type: 'datetime' })
  matchedAt: Date;

  @Column({
    type: 'text',
    enum: ['pending', 'matched', 'blocked'],
    default: 'pending',
  })
  role: 'pending' | 'matched' | 'blocked';

  @OneToMany(() => Message, (message) => message.match, { cascade: true }) // cascade: true automatically adds the message in the messages-table
  messages: Message[];
}
