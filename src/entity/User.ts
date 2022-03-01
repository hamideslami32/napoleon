import dayjs from "dayjs";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auth } from "./Auth";
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
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  access_due_date: Date = dayjs().add(-1, "date").toDate();

  @Column()
  points: number = 0;

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

  @OneToOne(() => Auth, (auth) => auth.user, { primary: true, cascade: true })
  @JoinColumn()
  auth: Auth;
}
