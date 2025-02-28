import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { UserAchievement } from '../user/user-achievement.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserAchievement, (userAchievement) => userAchievement.user, {
    cascade: true, // this creates the userAchievement automatically
  })
  achievements: UserAchievement[];

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';
}
