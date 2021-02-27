import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Movie } from '../models/movie';
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
  async addMovie(@Body('title') title: string): Promise<Movie> {
    const movie = await this.movieService.getMovieFromOmdb(title);
    return movie;
  }
}
