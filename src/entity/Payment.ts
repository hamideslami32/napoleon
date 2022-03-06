import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum Products {
    COURSE = 'course',
    BUNDLE = 'bundle',
    SUBSCRIPTION = 'subscription'
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
      id: number;

    @Column('enum', { enum: Products })
      product: Products;

    @Column()
      product_id: number;

    @Column('numeric')
      amount: number;

    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn()
      user: User;
}