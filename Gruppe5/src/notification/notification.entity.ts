import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';

@Entity()
export class Notification extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column()
  message: string;

  @Column({
    type: 'text',
    enum: ['registration', 'event_update', 'reminder', 'general'],
  })
  type: 'registration' | 'event_update' | 'reminder' | 'general';

  @Column({ default: false })
  isRead: boolean;
}
