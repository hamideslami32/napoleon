import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      description: string;

    @ManyToOne(() => User, user => user.comments)
      user: User;


    @ManyToOne(() => Comment, (comment) => comment.children)
      parent: Comment;

    @OneToMany(() => Comment, (comment) => comment.parent)
      children: Comment[];

}