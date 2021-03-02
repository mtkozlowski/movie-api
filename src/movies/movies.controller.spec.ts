import { ConflictException, HttpCode } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { movieControllerMockedProviders } from './__mocks__/movie.controller.mock';
import * as moviesRepository from './__mocks__/moviesRepository.mock.json';

const userId = 123;
const usersMovie = moviesRepository.filter(
  (movie) => movie.addedByUserId === userId,
);
const movieTitle = 'Reservoir dogs';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: movieControllerMockedProviders,
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMoviesByUser', () => {
    it('should return an array of user specific movies', async () => {
      await expect(controller.getMoviesByUser(userId)).resolves.toEqual(
        usersMovie,
      );
    });
  });

  describe('addMovie', () => {
    it('should add a new movie and return success message', async () => {
      const movieCount = moviesRepository.length;
      await expect(controller.addMovie(movieTitle, userId)).resolves.toEqual(
        `Movie: ${movieTitle} has been succesfully saved.`,
      );
      expect(moviesRepository.length).toEqual(movieCount + 1);
    });

    it('should return the new Conflict Exception and quit', async () => {
      const movieCount = moviesRepository.length;
      await expect(
        controller.addMovie('Kill Bill: Vol. 2', userId),
      ).rejects.toThrowError(ConflictException);
      expect(moviesRepository.length).toEqual(movieCount);
    });
  });
});
