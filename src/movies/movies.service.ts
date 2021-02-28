import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Connection, Repository } from 'typeorm';
import { MovieDto } from '../dto/movieDto';

@Injectable()
export class MoviesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async getMoviesByUser(id: number): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { addedByUserId: id } });
  }

  async save(movieDto: MovieDto, userId: number): Promise<Movie> {
    const { title, director: directory, genre, released } = movieDto;
    /** ...movieDto doesn't work because missing iterator maybe extending class? */
    const movie = new Movie(title, directory, genre, released, userId);
    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByTitleForUser(title: string, userId: number): Promise<boolean> {
    const movie = await this.connection
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .where('title = :title', { title })
      .andWhere('addedByUserId =  :addedByUserId', { addedByUserId: userId })
      .getOne();

    return movie.title === '';
  }

  async getMovieCountInCurrentMonth(userId: number): Promise<number> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const movies = await this.connection
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .where('addedByUserId = :addedByUserId', { addedByUserId: userId })
      .andWhere('month(addedAt) = :month', { month: month })
      .getMany();
    return movies.length;
  }
}
