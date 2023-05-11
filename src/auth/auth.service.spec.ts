import { JwtModule } from '@nestjs/jwt/';
import { PassportModule } from '@nestjs/passport/';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtSecret } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: 30 * 60 },
        }),
        PassportModule,
        UsersModule,
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// validateUser
// login
