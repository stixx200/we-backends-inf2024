import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';
}
