import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MovieDto } from '../dto/movieDto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMoviesByUser(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addMovie(
    @Body('title') title: string,
    @Request() req,
  ): Promise<MovieDto> {
    const movie = await this.movieService.getMovieFromOmdb(title);
    this.movieService.addMovieToRepository(movie, req.user.userId);
    return movie;
  }

  @Get('all')
  async getAllMovies() {
    return this.movieService.getAllMovies();
  }
}
