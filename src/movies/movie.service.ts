import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { MovieDto } from '../dto/movieDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async getMoviesByUser(userId: number): Promise<Movie[]> {
    return this.getOneByUserId(userId);
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

  async exists(title: string, userId: number): Promise<boolean> {
    const movie = await this.getOneByTitleAndUserId(title, userId);
    return movie !== null && typeof movie !== 'undefined';
  }

  async getOneByUserId(userId: number) {
    return this.moviesRepository.find({ where: { addedByUserId: userId } });
  }

  async getOneByTitleAndUserId(title: string, userId: number) {
    return await this.moviesRepository
      .createQueryBuilder('movie')
      .where('title = :title', { title })
      .andWhere('addedByUserId =  :addedByUserId', { addedByUserId: userId })
      .getOne();
  }

  async getMovieCountInCurrentMonth(userId: number): Promise<number> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const movies = await this.moviesRepository
      .createQueryBuilder('movie')
      .where('addedByUserId = :addedByUserId', { addedByUserId: userId })
      .andWhere('month(addedAt) = :month', { month: month })
      .getMany();
    return movies.length;
  }
}
