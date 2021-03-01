import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MoviesRepositoryModule } from 'src/movies-repository/movies-repository.module';
import { RoleService } from './role.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 30 * 60 },
      }),
    }),
    MoviesRepositoryModule,
  ],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
