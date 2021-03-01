import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { Connection } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { Role } from '../types/role.type';

export enum MoviesAllowedInMonth {
  basic = 5,
  premium = Infinity,
}

@Injectable()
export class RoleService {
  constructor(private connection: Connection) {}

  async getMovieCountInCurrentMonth(userId: number): Promise<number> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const movies = await this.connection
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .where('addedByUserId = :addedByUserId', { addedByUserId: userId })
      .andWhere('month(addedAt) = :month', { month: month })
      .getMany();
    return movies.length;
  }

  async isUserAllowedToAddNewMovie(userId: number, userRole: Role) {
    const numberOfMoviesInCurrentMonth = await this.getMovieCountInCurrentMonth(
      userId,
    );
    return MoviesAllowedInMonth[userRole] - numberOfMoviesInCurrentMonth > 0;
  }
}
