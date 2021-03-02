import { JwtService } from '@nestjs/jwt';
import { MovieDto } from '../../dto/movieDto';
import { Movie } from '../../entities/movie.entity';
import { OmdbService } from '../../Omdb/omdb.service';
import { RoleService } from '../../role/role.service';
import { MoviesService } from '../movies.service';
import * as moviesRepository from './moviesRepository.mock.json';

const director = 'Quentin Tarantino';
const genre = 'Crazy';
const released = 'Tue Nov 05 1985 01:53:20 GMT+0100';
const addedByUserId = 123;
const addedAt = 'Tue Mar 02 2021 01:08:41 GMT+0100';
const id = 30;

export const movieControllerMockedProviders = [
  {
    provide: RoleService,
    useValue: {
      isUserAllowedToAddNewMovie: jest.fn(),
    },
  },
  {
    provide: JwtService,
    useValue: {
      verify: jest.fn(),
    },
  },
  {
    provide: OmdbService,
    useValue: {
      getMovieDetails: jest.fn(
        (title) =>
          new MovieDto(
            title,
            new Date(Date.now()).toString(),
            'action',
            'director',
          ),
      ),
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
      save: jest.fn((movie: MovieDto, userId: number) => {
        const newMovie = new Movie(
          movie.title,
          director,
          genre,
          new Date(released),
          userId,
        );
        moviesRepository.push({
          title: movie.title,
          director,
          genre,
          released,
          addedByUserId,
          addedAt,
          id,
        });
        return newMovie;
      }),
      exists: jest.fn((title, userId) => {
        return (
          moviesRepository.filter((movie) => {
            return movie.title === title && movie.addedByUserId === userId;
          }).length > 0
        );
      }),
    },
  },
];
