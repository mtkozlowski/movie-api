import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmdbModule } from './Omdb/omdb.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'movieappdb',
      entities: [Movie],
      synchronize: true,
    }),
    OmdbModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
