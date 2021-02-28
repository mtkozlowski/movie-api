import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let provider: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    provider = module.get<MoviesService>(MoviesService);
  });

  describe('findAll', () => {
    it('should return array of movies', async () => {
      const result = [new Movie()];
      jest
        .spyOn(provider, 'getMoviesByUser')
        .mockImplementation(async (id) => result);

      expect(await controller.getMoviesByUser(1)).toBe(result);
    });
  });
});
