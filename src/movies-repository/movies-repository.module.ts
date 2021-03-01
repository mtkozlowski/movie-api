import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { MoviesRepositoryService } from './movies-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesRepositoryService],
  exports: [MoviesRepositoryService],
})
export class MoviesRepositoryModule {}
