import { Injectable } from '@nestjs/common';
import { Role } from '../types/role.type';

export type User = {
  id: number;
  role: Role;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 123,
      role: 'basic',
      name: 'Basic Thomas',
      username: 'basic-thomas',
      password: 'sR-_pcoow-27-6PAwCD8',
    },
    {
      id: 434,
      role: 'premium',
      name: 'Premium Jim',
      username: 'premium-jim',
      password: 'GBLtTyq3E_UNjFnpo9m6',
    },
  ];

  async get(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
