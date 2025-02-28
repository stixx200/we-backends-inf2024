import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../shared/base';

@Entity()
export class Achievement extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
