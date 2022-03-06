import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bundle } from './Bundle';
import { Category } from './Category';
import { Comment } from './Comment';
import { Episode } from './Episode';
import { Tag } from './Tag';
import { User } from './User';

export enum PaymentType {
  FREE = 'free',
  VIP = 'vip',
  CASH = 'cash',
}

export enum ContentStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  UPCOMMING = 'upcoming',
  TRIAL = 'trial'
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
    enum: PaymentType,
  })
    payment_type: PaymentType;

  @Column({ nullable: true })
    video_url: string;

  @Column({ nullable: true })
    image_url: string;

  @Column('numeric')
    price = 0;

  @Column({ nullable: true, enum: ContentStatus })
    status: ContentStatus;

  @Column({ nullable: true })
    release_date: Date = null;

  @OneToOne(() => Category)
  @JoinColumn()
    category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
    tags: Tag[];

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'author' })
    author: User;

  @OneToMany(() => Episode, (episode) => episode.course)
    episodes: Episode[];

  @ManyToMany(() => Comment)
  @JoinTable()
    comments: Comment[];

  @ManyToOne(() => Bundle, bundle => bundle.courses)
  @JoinColumn()
    bundle: Bundle;
}
