import { Injectable } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { MovieDto } from '../dto/movieDto';
import { MoviesRepositoryService } from '../movies-repository/movies-repository.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepositoryService: MoviesRepositoryService,
  ) {}

  async getMoviesByUser(userId: number): Promise<Movie[]> {
    return this.moviesRepositoryService.getOneByUserId(userId);
  }

  async save(movieDto: MovieDto, userId: number): Promise<Movie> {
    const { title, director: directory, genre, released } = movieDto;
    /** ...movieDto doesn't work because missing iterator maybe extending class? */
    const movie = new Movie(title, directory, genre, released, userId);
    return this.moviesRepositoryService.save(movie);
  }

  async exists(title: string, userId: number): Promise<boolean> {
    const movie = await this.moviesRepositoryService.getOneByTitleAndUserId(
      title,
      userId,
    );
    return movie !== null && typeof movie !== 'undefined';
  }
}
