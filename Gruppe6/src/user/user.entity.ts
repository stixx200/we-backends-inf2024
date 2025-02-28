import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Interest } from './interest.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  isActive: boolean;

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  // erweiterte Profildaten

  @Column({ nullable: true })
  displayName?: string; // Öffentlicher Anzeigename, falls abweichend vom username

  @Column({ type: 'datetime', nullable: true })
  birthday?: Date; // Geburtsdatum

  @Column({
    nullable: true,
    type: 'text',
    enum: ['male', 'female', 'other'],
  })
  gender?: 'male' | 'female' | 'other'; // Geschlecht (als Union-Typ, optional)

  @Column({ nullable: true })
  location?: string; // Wohnort oder Region

  @Column({ nullable: true })
  aboutMe?: string; // Freitextbeschreibung

  @Column({ nullable: true })
  profilePictureUrl?: string; // Link zum Profilbild

  @ManyToMany(() => Interest, { cascade: true }) // cascade: true automatically adds the interest in the interests-table
  @JoinTable()
  interests?: Interest[];
}
