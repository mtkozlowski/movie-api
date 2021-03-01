import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { OmdbModule } from '../Omdb/omdb.module';
import { JwtModule } from '@nestjs/jwt';
import { MoviesRepositoryModule } from '../movies-repository/movies-repository.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    OmdbModule,
    MoviesRepositoryModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
