import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { Comment } from './Comment';
import { ContentStatus } from './Course';
import { Tag } from './Tag';
import { User } from './User';


@Entity()
export class Article {
    @PrimaryGeneratedColumn()
      id: number;

    @Column({ unique: true })
      title: string;

    @Column()
      description: string;

    @Column('text')
      content: string;

    @Column()
      imageUrl: string;

    @Column()
      claps: number;

    @Column()
      slug: string;

    @Column('enum', { enum: ContentStatus })
      status: ContentStatus;

    @ManyToOne(() => User, (user) => user.articles)
      author: User;

    @OneToOne(() => Category)
    @JoinColumn()
      category: Category;

      @ManyToMany(() => Tag)
      @JoinTable()
        tags: Tag[];

    @ManyToMany(() => Comment)
    @JoinTable()
      comments: Comment[];
}
