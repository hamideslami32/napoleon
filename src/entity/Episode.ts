import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { ContentStatus, Course } from './Course';

export enum EpisodeType {
  VIDEO = 'video',
  TEXT = 'text',
  INTERACTIVE = 'interactive',
  QUIZ = 'quiz'
}

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    title: string;

  @Column({ unique: true })
    slug: string;

  @Column()
    description: string;

  @Column({ nullable: true })
    video_url: string;

  @Column({ nullable: true })
    image_url: string;

  @Column({ type:'enum', enum: EpisodeType })
    type: EpisodeType;

  @Column({ enum: ContentStatus })
    status: ContentStatus;

  @ManyToOne(() => Course, (course) => course.episodes)
  @JoinColumn()
    course: Course;

  @OneToOne(() => Category)
  @JoinColumn()
    category: Category;
}
