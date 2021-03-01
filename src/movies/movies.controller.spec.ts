import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../entities/movie.entity';
import { OmdbService } from '../Omdb/omdb.service';
import { RoleService } from '../role/role.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import * as moviesRepository from './__mocks__/moviesRepository.mock.json';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            isUserAllowedToAddNewMovie: jest.fn((userId, userRole) => true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(() => ({
              userId: 123,
              userRole: 'basic',
            })),
          },
        },
        {
          provide: OmdbService,
          useValue: {
            getMovieDetails: jest.fn((title) => ({
              title,
              released: new Date(Date.now()),
              director: 'director',
              genre: 'action',
            })),
          },
        },
        {
          provide: MoviesService,
          useValue: {
            getMoviesByUser: jest.fn((userId: number) => {
              return moviesRepository.filter(
                (movie) => movie.addedByUserId === userId,
              );
            }),
            save: jest.fn(
              (movie: any, userId: number) =>
                new Movie(
                  movie.title,
                  movie.directory,
                  movie.genre,
                  movie.released,
                  userId,
                ),
            ),
            exists: jest.fn(() => false),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
