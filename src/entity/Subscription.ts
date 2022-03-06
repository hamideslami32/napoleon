import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum SubscriptionType {
    VIP = 'vip'
}

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      title: string;

    @Column()
      expiration: Date;

    @Column('numeric')
      price: number;

    @Column()
      accessTime: Date;

    @Column('enum', { enum: SubscriptionType })
      type: SubscriptionType;


    @ManyToMany(() => User, user => user.subscriptions)
      users: User[];

}