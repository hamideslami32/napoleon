import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

enum Payment_Type {
  FREE = 'free',
  VIP = 'vip',
  CASH = 'cash',
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true })
    title: string;

  @Column()
    description: string;

  @Column('enum', {
    enum: Payment_Type,
  })
    payment_type: Payment_Type;

  @Column({ nullable: true })
    video_url: string;

  @Column({ nullable: true })
    image_url: string;

  @Column('numeric')
    price = 0;

  @Column({ nullable: true })
    status: string;

  @Column({ nullable: true })
    release_date: Date = null;

  @Column({ nullable: true })
    category_id: number;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'author' })
    author: User;
}
