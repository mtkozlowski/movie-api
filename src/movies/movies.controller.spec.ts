import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesRepositoryModule } from '../movies-repository/movies-repository.module';
import { OmdbModule } from '../Omdb/omdb.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import * as moviesRepository from './__mocks__/moviesRepository.mock.json';

describe('MoviesController', () => {
  let controller: MoviesController;
  let provider: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: async () => ({
            secret: process.env.JWT_SECRET,
          }),
        }),
        OmdbModule,
        MoviesRepositoryModule,
      ],
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            getMoviesByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    provider = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
