import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Achievement } from '../achievement/achievement.entity';
import { User } from './user.entity';

@Entity()
export class UserAchievement extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Achievement)
  achievement: Achievement;

  @Column()
  achievedAt: Date;

  @Column({ default: false })
  achieved: boolean;
}
