import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Movie } from '../models/movie';

@Injectable()
export class MoviesService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
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

  async getMovieFromOmdb(title: string): Promise<Movie> {
    const movieId = await this.getMovieId(title);
    const url = `http://www.omdbapi.com/?apikey=${this.key}&i=${movieId}`;
    try {
      const { data } = await this.httpService.get(url).toPromise();
      const movie = new Movie(data);
      return movie;
    } catch (error) {
      console.error('Error at getMovieFromOmdb');
      throw new Error(error);
    }
  }
}
