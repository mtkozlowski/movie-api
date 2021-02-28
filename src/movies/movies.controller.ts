import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
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
  @HttpCode(201)
  async addMovie(
    @Body('title') title: string,
    @UserId() userId: number,
    @UserRole() userRole: Role,
  ) {
    if (
      !(await this.roleService.isUserAllowedToAddNewMovie(userId, userRole))
    ) {
      throw new ForbiddenException(
        'You have exceeded quota of maximum movies to add per month',
      );
    }

    const isMovieSaved = await this.moviesService.getByTitleForUser(
      title,
      userId,
    );

    if (isMovieSaved) {
      throw new ConflictException();
    }

    const movie = await this.omdbService.getMovieDetails(title);
    this.moviesService.save(movie, userId);

    return `Movie: ${title} has been succesfully saved.`;
  }

  @Get('all')
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }
}
