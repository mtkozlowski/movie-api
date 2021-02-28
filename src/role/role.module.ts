import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [RoleService, MoviesService],
  exports: [RoleService],
})
export class RoleModule {}
