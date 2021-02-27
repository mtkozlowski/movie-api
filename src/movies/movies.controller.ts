import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/decorators/userId.decorator';
import { UserRole } from 'src/decorators/userRole.decorator';
import { ExternalSourceService } from 'src/external-source/external-source.service';
import { UsersService, Role } from 'src/users/users.service';
import { MovieDto } from '../dto/movieDto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly externalSourceService: ExternalSourceService,
    private readonly usersService: UsersService,
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
    if (!this.moviesService.isUserAllowedToAddNewMovie(userId, userRole)) {
      throw new UnauthorizedException();
    }

    const existingMovie = await this.moviesService.getUserMovieByTitle(
      title,
      userId,
    );

    if (existingMovie) {
      return existingMovie;
    }

    const movie = await this.externalSourceService.getMovieDetails(title);
    // console.log(movie.Title);
    // console.log(movie.Released);
    // console.log(movie.Genre);
    // console.log(movie.Directory);
    // if (!movie.Released) {
    //   throw new HttpException(
    //     `Movie of this title: ${title} does not exist.`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    this.moviesService.addMovieToRepository(movie, userId);
    return movie;
  }

  @Get('all')
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }
}
