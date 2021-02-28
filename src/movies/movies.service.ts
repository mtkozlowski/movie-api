import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { MoviesAllowedInMonth, Role } from '../users/users.service';
import { Connection, Repository } from 'typeorm';
import { MovieDto } from '../dto/movieDto';

@Injectable()
export class MoviesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async addMovieToRepository(
    movieDto: MovieDto,
    userId: number,
  ): Promise<Movie> {
    const movie = new Movie();
    movie.title = movieDto.Title;
    movie.directory = movieDto.Directory;
    movie.genre = movieDto.Genre;
    movie.released = movieDto.Released;
    movie.addedByUserId = userId;

    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserMoviesByTitle(title: string, userId: number): Promise<any> {
    const movies = await this.moviesRepository.find({
      where: { title, addedByUserId: userId },
    });
    if (movies.length === 0) {
      return null;
    }
    return movies;
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async getMoviesByUser(id: number): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { addedByUserId: id } });
  }

  async isUserAllowedToAddNewMovie(userId: number, userRole: Role) {
    const numberOfMoviesInCurrentMonth = await this.getNumberOfUserMoviesFromCurrentMonth(
      userId,
    );
    return MoviesAllowedInMonth[userRole] - numberOfMoviesInCurrentMonth > 0;
  }

  async getNumberOfUserMoviesFromCurrentMonth(id: number): Promise<number> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const movies = await this.connection
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .where('addedByUserId = :addedByUserId', { addedByUserId: id })
      .andWhere('month(addedAt) = :month', { month: month })
      .getMany();
    return movies.length;
  }
}
