import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  token: string;
  @Column()
  refreshToken: string;
  @OneToOne(() => User, (user) => user.auth)
  user: User;

  constructor(obj?: Partial<Record<keyof Auth, any>>) {
    if (obj)
      Object.entries(obj).forEach(([key, value]) => {
        this[key] = value;
      });
  }
}
