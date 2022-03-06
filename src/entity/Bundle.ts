import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Bundle {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      name: string;

    @Column()
      desctiption: string;

    @Column('numeric')
      price: number;

    @OneToMany(() => Course, course => course.bundle)
      courses: Course[];
}