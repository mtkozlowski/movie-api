import { Injectable } from '@nestjs/common';
import { Role } from '../types/role.type';
import { MoviesRepositoryService } from '../movies-repository/movies-repository.service';

export enum MoviesAllowedInMonth {
  basic = 5,
  premium = Infinity,
}

@Injectable()
export class RoleService {
  constructor(
    private readonly moviesRepositoryService: MoviesRepositoryService,
  ) {}

  async isUserAllowedToAddNewMovie(userId: number, userRole: Role) {
    const numberOfMoviesInCurrentMonth = await this.moviesRepositoryService.getMovieCountInCurrentMonth(
      userId,
    );
    return MoviesAllowedInMonth[userRole] - numberOfMoviesInCurrentMonth > 0;
  }
}
