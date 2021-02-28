import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MovieDto } from '../dto/movieDto';

@Injectable()
export class ExternalSourceService {
  constructor(private httpService: HttpService) {
    this.key = process.env.OMBD_API_KEY;
  }

  private readonly key: string;

  async getMovieDetails(title: string): Promise<MovieDto | any> {
    const url = `http://www.omdbapi.com/?apikey=${this.key}&t=${title}&type=movie`;
    try {
      const { data } = await this.httpService.get(url).toPromise();
      if (data.Error) {
        throw new HttpException(
          `Movie of this title: ${title} does not exist.`,
          HttpStatus.NOT_FOUND,
        );
      }
      const movie = new MovieDto(data);
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }
}
