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

  async getMovieDetails(searchTitle: string): Promise<MovieDto> {
    const url = this.getUrl(searchTitle);
    try {
      const { data } = await this.httpService.get(url).toPromise();
      const {
        Title: title = searchTitle,
        Released: released,
        Genre: genre,
        Director: director,
      } = data;
      const movieDto = new MovieDto(title, released, genre, director);
      return movieDto;
    } catch (error) {
      throw new Error(error);
    }
  }
}
