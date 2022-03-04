import dayjs from 'dayjs';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: true })
    firstname: string;

  @Column({ nullable: true })
    lastname: string;

  @Column()
    email: string;

  @Column({ nullable: true })
    phone: string;

  @Column({ unique: true })
    username: string;

  @Column()
    password: string;

  @Column()
    access_due_date: Date = dayjs().add(-1, 'date').toDate();

  @Column('int')
    points = 0;

  @Column('enum', {
    enum: Gender,
    nullable: true,
  })
    gender: Gender;

  @Column('date', { nullable: true })
    birthdate: Date;

  @Column({ nullable: true })
    avatar: string;

  @Column({ nullable: true, default: null, type: 'text' })
    token: string;
  @Column({ nullable: true, default: null })
    refreshToken: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
    roles: Role[];
}
