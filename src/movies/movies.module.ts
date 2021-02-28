import { HttpModule, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';
import { Movie } from '../entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalSourceModule } from '../external-source/external-source.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([Movie]),
    ExternalSourceModule,
    UsersModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
