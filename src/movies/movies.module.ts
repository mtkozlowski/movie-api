import { HttpModule, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from '../entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmdbModule } from '../Omdb/omdb.module';
import { UsersModule } from '../users/users.module';
import { RoleModule } from 'src/role/role.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Movie]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    OmdbModule,
    UsersModule,
    RoleModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
