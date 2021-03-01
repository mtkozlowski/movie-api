import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserId } from '../decorators/userId.decorator';
import { OmdbService } from '../Omdb/omdb.service';
import { MoviesService } from './movies.service';
import { RoleGuard } from '../role/role.guards';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly omdbService: OmdbService,
    private readonly moviesService: MoviesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMoviesByUser(@UserId() userId: number) {
    return this.moviesService.getMoviesByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Post()
  @HttpCode(201)
  /* In future can also return header Location to resource */
  async addMovie(@Body('title') title: string, @UserId() userId: number) {
    const movieExists = await this.moviesService.exists(title, userId);
    if (movieExists) {
      throw new ConflictException();
    }

    const movie = await this.omdbService.getMovieDetails(title);
    this.moviesService.save(movie, userId);
    return `Movie: ${title} has been succesfully saved.`;
  }
}
