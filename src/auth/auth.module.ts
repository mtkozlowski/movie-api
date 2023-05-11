import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

export const jwtSecret =
  'JWT_SECRET=0eda17ff1d4f682c4e78f7e94cfcca26b1fada982c822cd0d618f68e6c698b64edb58b6ec1c8abecccd55c853715f879c41da7335e0a6178e2f349169741c1c9';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
