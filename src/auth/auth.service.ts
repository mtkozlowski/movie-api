import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const { password, username, id, ...rest } = user;
    const payload = {
      userId: id,
      ...rest,
      sub: id.toString(),
      iss: 'https://www.netguru.com/',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
