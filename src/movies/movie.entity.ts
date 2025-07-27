import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  movie_title?: string;

  @Column()
  movie_publishing_year?: number;

  @Column()
  movie_image?: string;

  @CreateDateColumn()
  createdAt?: Date;
}
