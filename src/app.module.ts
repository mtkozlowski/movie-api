import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalSourceModule } from './external-source/external-source.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    ExternalSourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
