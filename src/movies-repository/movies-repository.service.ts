import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class MoviesRepositoryService {
  constructor(
    private connection: Connection,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async getOneByUserId(userId: number) {
    return this.moviesRepository.find({ where: { addedByUserId: userId } });
  }

  async getOneByTitleAndUserId(title: string, userId: number): Promise<Movie> {
    const movie = await this.connection
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .where('title = :title', { title })
      .andWhere('addedByUserId =  :addedByUserId', { addedByUserId: userId })
      .getOne();
    return movie;
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

  async save(movie: Movie): Promise<Movie> {
    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
