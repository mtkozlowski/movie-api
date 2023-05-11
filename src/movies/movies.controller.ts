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
import { MovieService } from './movie.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly omdbService: OmdbService,
    private readonly moviesService: MovieService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMoviesByUser(@UserId() userId: number) {
    return this.moviesService.getMoviesByUser(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async addMovie(@Body('title') title: string, @UserId() userId: number) {
    const movieExists = await this.moviesService.exists(title, userId);
    if (movieExists) {
      throw new ConflictException();
    }

    const movieDto = await this.omdbService.getMovieDetails(title);
    const savedMovie = await this.moviesService.save(movieDto, userId);
    return `Movie: ${savedMovie.title} has been succesfully saved.`;
  }
}
