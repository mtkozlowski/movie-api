import { HttpModule, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
