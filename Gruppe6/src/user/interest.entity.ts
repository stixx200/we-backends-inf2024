import { BaseEntity } from 'src/shared/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Interest extends BaseEntity {
  @Column()
  name: string;
}
