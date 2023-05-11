import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export type JwtUserPayload = {
  userId: number;
  sub: string;
  name: string;
  role: string;
  iss: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.get(username);
    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: User) {
    const payload: JwtUserPayload = {
      userId: user.id,
      sub: user.id.toString(),
      name: user.name,
      role: user.role,
      iss: 'Matthews Movie App',
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
