import {
  Injectable,
  HttpService,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from '../dto/movieDto';

@Injectable()
export class MoviesService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  private readonly key = this.configService.get<string>('OMBD_API_KEY');

  async getMovieId(title: string): Promise<any> {
    const url = `http://www.omdbapi.com/?type=movie&apikey=${this.key}&s=${title}`;
    console.log(url);
    try {
      const { data } = await this.httpService.get(url).toPromise();
      const { imdbID: movieId } = data.Search[0];
      return movieId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMovieFromOmdb(title: string): Promise<MovieDto> {
    const movieId = await this.getMovieId(title);
    const url = `http://www.omdbapi.com/?apikey=${this.key}&i=${movieId}`;
    try {
      const { data } = await this.httpService.get(url).toPromise();
      const movie = new MovieDto(data);
      return movie;
    } catch (error) {
      console.error('Error at getMovieFromOmdb');
      throw new Error(error);
    }
  }

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

  async getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }
}
