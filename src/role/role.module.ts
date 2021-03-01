import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { RoleService } from './role.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 30 * 60 },
      }),
    }),
  ],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
