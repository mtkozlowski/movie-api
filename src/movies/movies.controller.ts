import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Movie } from 'model/movie';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  index(@Query('token') token: string): any {
    return token;
  }

  @Post()
  async addMovie(@Body('title') title: string): Promise<Movie> {
    const movie = await this.movieService.getMovieFromOmdb(title);
    return movie;
  }
}