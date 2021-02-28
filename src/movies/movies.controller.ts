import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserId } from '../decorators/userId.decorator';
import { UserRole } from '../decorators/userRole.decorator';
import { OmdbService } from '../Omdb/omdb.service';
import { Role } from '../types/role.type';
import { MoviesService } from './movies.service';
import { RoleService } from 'src/role/role.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly omdbService: OmdbService,
    private readonly moviesService: MoviesService,
    private readonly roleService: RoleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMoviesByUser(@UserId() userId: number) {
    return this.moviesService.getMoviesByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addMovie(
    @Body('title') title: string,
    @UserId() userId: number,
    @UserRole() userRole: Role,
  ): Promise<MovieDto> {
    if (
      !(await this.roleService.isUserAllowedToAddNewMovie(userId, userRole))
    ) {
      throw new UnauthorizedException(
        'You have exceeded maximum number of added movies per month',
      );
    }

    const existingMovie = await this.moviesService.getUserMoviesByTitle(
      title,
      userId,
    );

    if (existingMovie) {
      return existingMovie;
    }

    this.moviesService.addMovieToRepository(movie, userId);
    return movie;
    const movie = await this.omdbService.getMovieDetails(title);
  }

  @Get('all')
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }
}
