import { HttpService, Injectable } from '@nestjs/common';
import { MovieDto } from '../dto/movieDto';

@Injectable()
export class OmdbService {
  constructor(private httpService: HttpService) {
    this.key = process.env.OMBD_API_KEY;
    this.omdbHost = process.env.OMBD_HOST;
  }

  private readonly key: string;
  private readonly omdbHost: string;

  private getUrl(title: string) {
    return `${this.omdbHost}/?apikey=${this.key}&t=${title}&type=movie`;
  }

  async getMovieDetails(title: string): Promise<MovieDto> {
    const url = this.getUrl(title);
    try {
      const { data } = await this.httpService.get(url).toPromise();
      const {
        Title: title,
        Released: released,
        Genre: genre,
        Director: director,
      } = data;
      const movie = new MovieDto(title, released, genre, director);
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }
}
