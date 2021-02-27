import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MovieDto } from 'src/dto/movieDto';

@Injectable()
export class ExternalSourceService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private readonly key = this.configService.get<string>('OMBD_API_KEY');

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
