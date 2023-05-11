import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MoviesController } from './movies.controller';
import { OmdbModule } from '../Omdb/omdb.module';
import { RoleModule } from '../role/role.module';
import { Movie } from '../entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), OmdbModule, RoleModule],
  providers: [MovieService],
  controllers: [MoviesController],
})
export class MoviesModule {}
