import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  access_due_date: Date;

  @Column({ nullable: true })
  points: number;

  @Column("enum", {
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column("date", { nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  avatar: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
