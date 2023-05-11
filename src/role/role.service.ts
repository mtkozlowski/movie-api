import { Injectable } from '@nestjs/common';
import { Role } from '../types/role.type';

export enum MoviesAllowedInMonth {
  basic = 5,
  premium = Infinity,
}

@Injectable()
export class RoleService {
  // constructor(private readonly moviesService: MovieService) {}

  async isUserAllowedToAddNewMovie(userId: number, userRole: Role) {
    const numberOfMoviesInCurrentMonth = 10;
    // await this.moviesService.getMovieCountInCurrentMonth(userId);
    return MoviesAllowedInMonth[userRole] - numberOfMoviesInCurrentMonth > 0;
  }
}
