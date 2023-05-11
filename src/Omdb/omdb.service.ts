import { Injectable } from '@nestjs/common';
import { MovieDto } from '../dto/movieDto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OmdbService {
  constructor(private httpService: HttpService) {
    this.key = process.env.OMBD_API_KEY as string;
    this.omdbHost = process.env.OMBD_HOST as string;
  }

  private readonly key: string;
  private readonly omdbHost: string;

  private getUrl(title: string) {
    return `${this.omdbHost}/?i=tt3896198&apikey=${this.key}&t=${title}&type=movie`;
  }

  async getMovieDetails(searchTitle: string): Promise<MovieDto> {
    const url = this.getUrl(searchTitle);
    try {
      const { data } = await this.httpService.axiosRef.get(url);
      const {
        Title: title = searchTitle,
        Released: released,
        Genre: genre,
        Director: director,
      } = data;
      return new MovieDto(title, released, genre, director);
    } catch (error) {
      throw new Error(error);
    }
  }
}
