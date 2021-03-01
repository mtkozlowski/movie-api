import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmdbModule } from './Omdb/omdb.module';
import { RoleModule } from './role/role.module';
import { MoviesRepositoryModule } from './movies-repository/movies-repository.module';

@Module({
  imports: [
    MoviesModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    OmdbModule,
    RoleModule,
    MoviesRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
