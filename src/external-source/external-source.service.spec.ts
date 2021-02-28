import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSourceService } from './external-source.service';
import * as validOmdbResponse from '../__mocks__/validOmdbResponse.json';
import { validOmdbTitle } from '../__mocks__/validOmdbTitle.json';
import { HttpModule, HttpService } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MovieDto } from '../dto/movieDto';

describe('ExternalSourceService', () => {
  let externalSourceService: ExternalSourceService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExternalSourceService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    externalSourceService = module.get<ExternalSourceService>(
      ExternalSourceService,
    );

    const result = new Observable((observer: Subscriber<AxiosResponse>) => {
      const axiosResponse: AxiosResponse = {
        data: validOmdbResponse,
        config: {},
        headers: {},
        status: 1,
        statusText: '',
      };
      observer.next(axiosResponse);
      observer.complete();
    });

    jest.spyOn(httpService, 'get').mockImplementation(() => {
      return result;
    });
  });

  it('should be defined', () => {
    expect(externalSourceService).toBeDefined();
  });

  it('should return valid MovieDto', () => {
    const movieDto = new MovieDto(validOmdbResponse);

    expect.assertions(1);
    return externalSourceService
      .getMovieDetails(validOmdbTitle)
      .then((data) => expect(data).toEqual(movieDto));
  });

  // it('should throw the NOT_FOUND Error', () => {
  //   expect.assertions(1);
  //   return externalSourceService
  //     .getMovieDetails('no film like this')
  //     .then((data) =>
  //       expect(data).toThrow(
  //         new HttpException(
  //           `Movie of this title: no film like this does not exist.`,
  //           HttpStatus.NOT_FOUND,
  //         ),
  //       ),
  //     );
  // });
});
