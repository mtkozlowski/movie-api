import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  constructor(
    title: string,
    directory: string,
    genre: string,
    released: Date,
    userId: number,
  ) {
    this.title = title;
    this.director = directory;
    this.genre = genre;
    this.released = released;
    this.addedByUserId = userId;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  released: Date;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  addedByUserId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: number;
}
