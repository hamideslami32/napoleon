import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({unique: true})
    title: string;

  @ManyToOne(()=> Category, (category) => category.children)
    parent: Category;

  @OneToMany(()=> Category, (category)=> category.parent)
    children: Category[];
    
}
