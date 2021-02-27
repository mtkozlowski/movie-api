import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  released: Date;

  @Column()
  genre: string;

  @Column()
  directory: string;

  @Column()
  addedByUserId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: number;
}
